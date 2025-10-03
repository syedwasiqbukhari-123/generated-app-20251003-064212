import { DashboardStats, RecentEmail, Thread, Lead, AiDraftResponse, Template, AnalyticsData } from '@/types';
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${errorText}`);
  }
  const data = await response.json();
  return data.data;
};
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch('/api/dashboard/stats');
  return handleResponse<DashboardStats>(response);
};
export const getRecentEmails = async (): Promise<RecentEmail[]> => {
  const response = await fetch('/api/dashboard/recent-emails');
  return handleResponse<RecentEmail[]>(response);
};
export const getInboxThreads = async (): Promise<Thread[]> => {
  const response = await fetch('/api/inbox/threads');
  return handleResponse<Thread[]>(response);
};
export const runLeadDetectionTest = async (): Promise<{ success: boolean }> => {
  const response = await fetch('/api/leads/test-detection', { method: 'POST' });
  return response.json();
};
export const getLeads = async (): Promise<Lead[]> => {
  const response = await fetch('/api/leads');
  return handleResponse<Lead[]>(response);
};
export const generateDraft = async (threadId: string): Promise<AiDraftResponse> => {
    const response = await fetch(`/api/inbox/threads/${threadId}/generate-draft`, { method: 'POST' });
    return handleResponse<AiDraftResponse>(response);
};
// Template APIs
export const getTemplates = async (): Promise<Template[]> => {
  const response = await fetch('/api/templates');
  return handleResponse<Template[]>(response);
};
export const createTemplate = async (template: Omit<Template, 'id'>): Promise<Template> => {
  const response = await fetch('/api/templates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(template),
  });
  return handleResponse<Template>(response);
};
export const updateTemplate = async (id: string, template: Partial<Template>): Promise<Template> => {
  const response = await fetch(`/api/templates/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(template),
  });
  return handleResponse<Template>(response);
};
export const deleteTemplate = async (id: string): Promise<{ id: string }> => {
  const response = await fetch(`/api/templates/${id}`, { method: 'DELETE' });
  return handleResponse<{ id: string }>(response);
};
// Analytics API
export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  const response = await fetch('/api/analytics');
  return handleResponse<AnalyticsData>(response);
};