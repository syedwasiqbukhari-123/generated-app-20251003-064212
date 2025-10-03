import OpenAI from 'openai';
import type { Message, ToolCall } from './types';
import { getToolDefinitions, executeTool } from './tools';
import { ChatCompletionMessageFunctionToolCall } from 'openai/resources/index.mjs';
/**
 * Generates a reply for a Shopify lead inquiry using Cloudflare AI.
 * @param emailBody The body of the lead's email.
 * @param env The worker environment containing AI credentials.
 * @returns A generated reply string.
 */
export async function generateLeadReply(emailBody: string, env: { CF_AI_BASE_URL: string; CF_AI_API_KEY: string }): Promise<string> {
  const client = new OpenAI({
    baseURL: env.CF_AI_BASE_URL,
    apiKey: env.CF_AI_API_KEY,
  });
  const systemPrompt = `You are an expert Shopify agency assistant. Your goal is to write a friendly, professional, and helpful initial reply to a potential lead.
- Keep the tone helpful and encouraging.
- Acknowledge their request from the email body.
- Briefly state that you can help.
- The primary call to action is to book a call using the placeholder [calendar_link].
- Do not invent services that are not mentioned.
- Keep the reply concise, around 3-4 sentences.
- Sign off with "Best,".
- Do NOT include a subject line.
- Do NOT use markdown.
- The user's email is:
---
${emailBody}
---`;
  try {
    const completion = await client.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [{ role: 'system', content: systemPrompt }],
      max_tokens: 250,
      temperature: 0.7,
    });
    return completion.choices[0]?.message?.content?.trim() || "We'd be happy to help with your request. Please book a time on our calendar: [calendar_link]";
  } catch (error) {
    console.error("Error generating lead reply:", error);
    // Provide a safe fallback response
    return "Thank you for your inquiry. We've received your message and will get back to you shortly. If you'd like to schedule a call, please use our calendar: [calendar_link]";
  }
}
/**
 * ChatHandler - Handles all chat-related operations (from template, can be used for other features)
 */
export class ChatHandler {
  private client: OpenAI;
  private model: string;
  constructor(aiGatewayUrl: string, apiKey: string, model: string) {
    this.client = new OpenAI({
      baseURL: aiGatewayUrl,
      apiKey: apiKey
    });
    this.model = model;
  }
  async processMessage(
    message: string,
    conversationHistory: Message[],
    onChunk?: (chunk: string) => void
  ): Promise<{
    content: string;
    toolCalls?: ToolCall[];
  }> {
    const messages = this.buildConversationMessages(message, conversationHistory);
    const toolDefinitions = await getToolDefinitions();
    if (onChunk) {
      const stream = await this.client.chat.completions.create({
        model: this.model,
        messages,
        tools: toolDefinitions,
        tool_choice: 'auto',
        stream: true,
      });
      return this.handleStreamResponse(stream, message, conversationHistory, onChunk);
    }
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages,
      tools: toolDefinitions,
      tool_choice: 'auto',
    });
    return this.handleNonStreamResponse(completion, message, conversationHistory);
  }
  private async handleStreamResponse(
    stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>,
    message: string,
    conversationHistory: Message[],
    onChunk: (chunk: string) => void
  ) {
    let fullContent = '';
    const accumulatedToolCalls: ChatCompletionMessageFunctionToolCall[] = [];
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta;
      if (delta?.content) {
        fullContent += delta.content;
        onChunk(delta.content);
      }
      if (delta?.tool_calls) {
        // Simplified tool call accumulation for streaming
        delta.tool_calls.forEach((tc, i) => {
          if (!accumulatedToolCalls[i]) {
            accumulatedToolCalls[i] = { id: tc.id || '', type: 'function', function: { name: '', arguments: '' } };
          }
          if (tc.function?.name) accumulatedToolCalls[i].function.name += tc.function.name;
          if (tc.function?.arguments) accumulatedToolCalls[i].function.arguments += tc.function.arguments;
        });
      }
    }
    if (accumulatedToolCalls.length > 0) {
      const executedTools = await this.executeToolCalls(accumulatedToolCalls);
      const finalResponse = await this.generateToolResponse(message, conversationHistory, accumulatedToolCalls, executedTools);
      return { content: finalResponse, toolCalls: executedTools };
    }
    return { content: fullContent };
  }
  private async handleNonStreamResponse(
    completion: OpenAI.Chat.Completions.ChatCompletion,
    message: string,
    conversationHistory: Message[]
  ) {
    const responseMessage = completion.choices[0]?.message;
    if (!responseMessage) return { content: 'Error processing request.' };
    if (!responseMessage.tool_calls) return { content: responseMessage.content || 'No content.' };
    const toolCalls = await this.executeToolCalls(responseMessage.tool_calls as ChatCompletionMessageFunctionToolCall[]);
    const finalResponse = await this.generateToolResponse(
      message,
      conversationHistory,
      responseMessage.tool_calls,
      toolCalls
    );
    return { content: finalResponse, toolCalls };
  }
  private async executeToolCalls(openAiToolCalls: ChatCompletionMessageFunctionToolCall[]): Promise<ToolCall[]> {
    return Promise.all(
      openAiToolCalls.map(async (tc) => {
        try {
          const args = tc.function.arguments ? JSON.parse(tc.function.arguments) : {};
          const result = await executeTool(tc.function.name, args);
          return { id: tc.id, name: tc.function.name, arguments: args, result };
        } catch (error) {
          return { id: tc.id, name: tc.function.name, arguments: {}, result: { error: `Execution failed: ${error instanceof Error ? error.message : 'Unknown'}` } };
        }
      })
    );
  }
  private async generateToolResponse(
    userMessage: string,
    history: Message[],
    openAiToolCalls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
    toolResults: ToolCall[]
  ): Promise<string> {
    const followUpCompletion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant.' },
        ...history.slice(-3).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
        { role: 'assistant', content: null, tool_calls: openAiToolCalls },
        ...toolResults.map((result, index) => ({
          role: 'tool' as const,
          content: JSON.stringify(result.result),
          tool_call_id: openAiToolCalls[index]?.id || result.id
        }))
      ],
    });
    return followUpCompletion.choices[0]?.message?.content || 'Tool results processed.';
  }
  private buildConversationMessages(userMessage: string, history: Message[]) {
    return [
      { role: 'system' as const, content: 'You are a helpful assistant.' },
      ...history.slice(-5).map(m => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: userMessage }
    ];
  }
  updateModel(newModel: string): void {
    this.model = newModel;
  }
}