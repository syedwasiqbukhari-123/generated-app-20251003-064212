import { Hono } from "hono";
import { getAgentByName } from 'agents';
import { ChatAgent } from './agent';
import { API_RESPONSES } from './config';
import { Env, getAppController, registerSession, unregisterSession } from "./core-utils";
import type { Lead, Template } from '../src/types';
import { generateLeadReply } from './chat';
// Mock Data
const mockDashboardStats = {
    new: 12,
    sent: 84,
    pending: 8,
    needsReview: 3,
    failed: 1,
};
const mockRecentEmails = [
    { id: '1', from: 'lead@shopify.com', subject: 'New store setup inquiry', status: 'Auto-Sent', reason: 'High confidence (92%)' },
    { id: '2', from: 'client@example.com', subject: 'Question about theme migration', status: 'Needs Review', reason: 'Low confidence (48%)' },
    { id: '3', from: 'partner@agency.com', subject: 'Re: Project proposal', status: 'Pending', reason: 'Scheduled for 9:00 AM' },
    { id: '4', from: 'another@shopify.com', subject: 'Help with CRO', status: 'Auto-Sent', reason: 'Keyword match' },
    { id: '5', from: 'test@gmail.com', subject: 'Follow up on our chat', status: 'Sent', reason: 'Manual send' },
];
const mockThreads = [
    {
        id: 'thread-1',
        status: 'New',
        from: 'lead@shopify.com',
        subject: 'New store setup inquiry',
        snippet: 'Hey team, we are looking for help...',
        timestamp: '2m ago',
        detectedService: 'Store Setup',
        confidence: 92,
        emails: [
            { id: 'email-1', from: 'lead@shopify.com', to: 'me', subject: 'New store setup inquiry', body: 'Hey team, we are looking for help setting up our new Shopify store. We have a few questions about theme customization and app integrations. Could you let us know your availability to chat?', timestamp: '2m ago' }
        ]
    },
    {
        id: 'thread-2',
        status: 'Drafts',
        from: 'client@example.com',
        subject: 'Question about theme migration',
        snippet: 'I was wondering if you could help...',
        timestamp: '1h ago',
        detectedService: 'Migration',
        confidence: 48,
        emails: [
            { id: 'email-2', from: 'client@example.com', to: 'me', subject: 'Question about theme migration', body: 'I was wondering if you could help with a theme migration. What is the process like?', timestamp: '1h ago' }
        ]
    },
];
let mockLeads: Lead[] = [
    { id: 'lead-1', from: 'client@example.com', subject: 'Question about theme migration', service: 'Migration', status: 'Needs Review', owner: 'Unassigned', lastAction: '1d ago', nextStep: '-', threadId: 'thread-2' },
    { id: 'lead-2', from: 'partner@agency.com', subject: 'Re: Project proposal', service: 'CRO', status: 'Waiting', owner: 'Jane Doe', lastAction: '3d ago', nextStep: 'Reply from client', threadId: 'thread-1' },
];
let mockTemplates: Template[] = [
    { id: 'tpl-1', service: 'Store Setup', step: 'Initial Reply', name: 'Initial Outreach', subject: 'Re: Your Shopify Store Setup', body: 'Hi {first_name|there},\n\nThanks for reaching out about your Shopify store setup. We can definitely help with that.\n\nWould you be open to a quick 15-minute call next week to discuss?\n\nBest,\nThe Zenith Team', tone: 'Friendly', isActive: true },
    { id: 'tpl-2', service: 'Store Setup', step: 'Follow-up 1', name: '48h Follow-up', subject: 'Following up on your Shopify store', body: 'Hi {first_name|there},\n\nJust wanted to follow up on your request. Let me know if you have a moment to chat this week.\n\nBest,\nThe Zenith Team', tone: 'Concise', isActive: true },
    { id: 'tpl-3', service: 'Theme Fix', step: 'Initial Reply', name: 'Theme Fix Inquiry', subject: 'Re: Shopify Theme Fix', body: 'Hi {first_name|there},\n\nThanks for the inquiry. Our experts can quickly resolve theme issues. What seems to be the problem?\n\nBest,\nThe Zenith Team', tone: 'Expert', isActive: true },
];
const mockAnalyticsData = {
    responseTime: [
      { name: 'Mon', 'Avg Time (min)': 15 }, { name: 'Tue', 'Avg Time (min)': 12 },
      { name: 'Wed', 'Avg Time (min)': 18 }, { name: 'Thu', 'Avg Time (min)': 10 },
      { name: 'Fri', 'Avg Time (min)': 25 }, { name: 'Sat', 'Avg Time (min)': 30 },
      { name: 'Sun', 'Avg Time (min)': 28 },
    ],
    outcomes: {
      replyRate: [ { name: 'Auto-Replied', value: 400 }, { name: 'Manual Reply', value: 150 }, { name: 'No Reply', value: 50 } ],
      bookingRate: [ { name: 'Booked', value: 250 }, { name: 'No Booking', value: 300 } ],
    },
    followUps: [
      { name: 'Store Setup', 'Step 1': 40, 'Step 2': 25 }, { name: 'Theme Fix', 'Step 1': 30, 'Step 2': 15 },
      { name: 'Migration', 'Step 1': 22, 'Step 2': 10 }, { name: 'CRO', 'Step 1': 18, 'Step 2': 5 },
    ],
    reliability: [
      { name: 'Week 1', 'Success': 99, 'Failed': 1 }, { name: 'Week 2', 'Success': 100, 'Failed': 0 },
      { name: 'Week 3', 'Success': 98, 'Failed': 2 }, { name: 'Week 4', 'Success': 99, 'Failed': 1 },
    ]
};
export function coreRoutes(app: Hono<{ Bindings: Env }>) {
    app.all('/api/chat/:sessionId/*', async (c) => {
        try {
        const sessionId = c.req.param('sessionId');
        const agent = await getAgentByName<Env, ChatAgent>(c.env.CHAT_AGENT, sessionId);
        const url = new URL(c.req.url);
        url.pathname = url.pathname.replace(`/api/chat/${sessionId}`, '');
        return agent.fetch(new Request(url.toString(), {
            method: c.req.method,
            headers: c.req.header(),
            body: c.req.method === 'GET' || c.req.method === 'DELETE' ? undefined : c.req.raw.body
        }));
        } catch (error) {
        console.error('Agent routing error:', error);
        return c.json({ success: false, error: API_RESPONSES.AGENT_ROUTING_FAILED }, { status: 500 });
        }
    });
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    // Zenith Inbox API Routes
    app.get('/api/dashboard/stats', (c) => c.json({ success: true, data: mockDashboardStats }));
    app.get('/api/dashboard/recent-emails', (c) => c.json({ success: true, data: mockRecentEmails }));
    app.get('/api/inbox/threads', (c) => c.json({ success: true, data: mockThreads }));
    app.post('/api/inbox/threads/:threadId/generate-draft', async (c) => {
        const { threadId } = c.req.param();
        const thread = mockThreads.find(t => t.id === threadId);
        if (!thread) return c.json({ success: false, error: 'Thread not found' }, 404);
        const emailBody = thread.emails[thread.emails.length - 1].body;
        const aiDraft = await generateLeadReply(emailBody, c.env);
        await new Promise(res => setTimeout(res, 1500));
        const response = { aiDraft, detectedService: thread.detectedService, confidence: thread.confidence };
        return c.json({ success: true, data: response });
    });
    // Lead Management Routes
    app.get('/api/leads', (c) => c.json({ success: true, data: mockLeads }));
    app.post('/api/leads/test-detection', (c) => {
        const newLead: Lead = { id: `lead-${Date.now()}`, from: 'test-lead@shopify.com', subject: 'Test: New store setup inquiry', service: 'Store Setup', status: 'Replied', owner: 'AI', lastAction: 'Just now', nextStep: 'Follow-up in 48h', threadId: 'thread-1' };
        mockLeads.unshift(newLead);
        return c.json({ success: true, data: newLead });
    });
    // Template Management Routes
    app.get('/api/templates', (c) => c.json({ success: true, data: mockTemplates }));
    app.post('/api/templates', async (c) => {
        const newTemplate = await c.req.json();
        newTemplate.id = `tpl-${Date.now()}`;
        mockTemplates.push(newTemplate);
        return c.json({ success: true, data: newTemplate }, 201);
    });
    app.put('/api/templates/:id', async (c) => {
        const { id } = c.req.param();
        const updatedTemplateData = await c.req.json();
        const index = mockTemplates.findIndex(t => t.id === id);
        if (index === -1) return c.json({ success: false, error: 'Template not found' }, 404);
        mockTemplates[index] = { ...mockTemplates[index], ...updatedTemplateData };
        return c.json({ success: true, data: mockTemplates[index] });
    });
    app.delete('/api/templates/:id', (c) => {
        const { id } = c.req.param();
        const initialLength = mockTemplates.length;
        mockTemplates = mockTemplates.filter(t => t.id !== id);
        if (mockTemplates.length === initialLength) return c.json({ success: false, error: 'Template not found' }, 404);
        return c.json({ success: true, data: { id } });
    });
    // Analytics Route
    app.get('/api/analytics', (c) => c.json({ success: true, data: mockAnalyticsData }));
    // Session Management Routes
    app.get('/api/sessions', async (c) => {
        const controller = getAppController(c.env);
        const sessions = await controller.listSessions();
        return c.json({ success: true, data: sessions });
    });
    app.post('/api/sessions', async (c) => {
        const body = await c.req.json().catch(() => ({}));
        const { title, sessionId: providedSessionId } = body;
        const sessionId = providedSessionId || crypto.randomUUID();
        let sessionTitle = title || `Chat ${new Date().toLocaleString()}`;
        await registerSession(c.env, sessionId, sessionTitle);
        return c.json({ success: true, data: { sessionId, title: sessionTitle } });
    });
    app.delete('/api/sessions/:sessionId', async (c) => {
        const sessionId = c.req.param('sessionId');
        const deleted = await unregisterSession(c.env, sessionId);
        if (!deleted) return c.json({ success: false, error: 'Session not found' }, 404);
        return c.json({ success: true, data: { deleted: true } });
    });
    app.put('/api/sessions/:sessionId/title', async (c) => {
        const sessionId = c.req.param('sessionId');
        const { title } = await c.req.json();
        if (!title) return c.json({ success: false, error: 'Title is required' }, 400);
        const controller = getAppController(c.env);
        const updated = await controller.updateSessionTitle(sessionId, title);
        if (!updated) return c.json({ success: false, error: 'Session not found' }, 404);
        return c.json({ success: true, data: { title } });
    });
    app.delete('/api/sessions', async (c) => {
        const controller = getAppController(c.env);
        const deletedCount = await controller.clearAllSessions();
        return c.json({ success: true, data: { deletedCount } });
    });
}