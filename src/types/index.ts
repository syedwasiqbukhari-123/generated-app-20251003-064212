export interface DashboardStats {
  new: number;
  sent: number;
  pending: number;
  needsReview: number;
  failed: number;
}
export interface RecentEmail {
  id: string;
  from: string;
  subject: string;
  status: 'Auto-Sent' | 'Needs Review' | 'Pending' | 'Sent' | 'Failed';
  reason: string;
}
export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
}
export interface Thread {
  id: string;
  status: 'New' | 'Drafts' | 'Waiting' | 'Replied' | 'Skipped';
  from: string;
  subject: string;
  snippet: string;
  timestamp: string;
  emails: Email[];
  detectedService: string;
  confidence: number;
  aiDraft?: string;
  automationPaused?: boolean;
}
export interface Lead {
  id: string;
  from: string;
  subject: string;
  service: string;
  status: 'Replied' | 'Needs Review' | 'Waiting' | 'Closed';
  owner: string;
  lastAction: string;
  nextStep: string;
  threadId: string;
}
export interface AiDraftResponse {
    aiDraft: string;
    detectedService: string;
    confidence: number;
}
export interface Template {
  id: string;
  service: string;
  step: 'Initial Reply' | 'Follow-up 1' | 'Follow-up 2';
  name: string;
  subject: string;
  body: string;
  tone: 'Friendly' | 'Expert' | 'Concise';
  isActive: boolean;
}
// Analytics Types
export interface ResponseTimeData {
  name: string;
  'Avg Time (min)': number;
}
export interface OutcomeData {
  name: string;
  value: number;
}
export interface FollowUpData {
  name: string;
  'Step 1': number;
  'Step 2': number;
}
export interface ReliabilityData {
  name: string;
  'Success': number;
  'Failed': number;
}
export interface AnalyticsData {
  responseTime: ResponseTimeData[];
  outcomes: {
    replyRate: OutcomeData[];
    bookingRate: OutcomeData[];
  };
  followUps: FollowUpData[];
  reliability: ReliabilityData[];
}