import { create } from 'zustand';
import { DashboardStats, RecentEmail, Thread, Lead, Template, AnalyticsData } from '@/types';
import {
  getDashboardStats,
  getRecentEmails,
  getInboxThreads,
  getLeads,
  generateDraft,
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getAnalyticsData,
} from '@/lib/api';
interface AppState {
  // State
  dashboardStats: DashboardStats | null;
  recentEmails: RecentEmail[];
  threads: Thread[];
  selectedThreadId: string | null;
  leads: Lead[];
  templates: Template[];
  analyticsData: AnalyticsData | null;
  automationActive: boolean;
  // Loading states
  loadingDashboard: boolean;
  loadingInbox: boolean;
  loadingLeads: boolean;
  generatingDraft: boolean;
  loadingTemplates: boolean;
  loadingAnalytics: boolean;
  // Actions
  fetchDashboardData: () => Promise<void>;
  fetchInboxThreads: () => Promise<void>;
  fetchLeads: () => Promise<void>;
  selectThread: (threadId: string | null) => void;
  generateDraftForSelectedThread: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
  addTemplate: (template: Omit<Template, 'id'>) => Promise<void>;
  editTemplate: (id: string, template: Partial<Template>) => Promise<void>;
  removeTemplate: (id: string) => Promise<void>;
  approveAndSendSelectedThread: () => Promise<void>;
  skipSelectedThread: () => Promise<void>;
  pauseAutomationForSelectedThread: () => Promise<void>;
  fetchAnalyticsData: () => Promise<void>;
  toggleAutomation: () => void;
  // Derived state (getters)
  getSelectedThread: () => Thread | undefined;
}
export const useStore = create<AppState>((set, get) => ({
  // Initial state
  dashboardStats: null,
  recentEmails: [],
  threads: [],
  selectedThreadId: null,
  leads: [],
  templates: [],
  analyticsData: null,
  automationActive: true,
  loadingDashboard: false,
  loadingInbox: false,
  loadingLeads: false,
  generatingDraft: false,
  loadingTemplates: false,
  loadingAnalytics: false,
  // Actions
  fetchDashboardData: async () => {
    set({ loadingDashboard: true });
    try {
      const [stats, emails] = await Promise.all([
        getDashboardStats(),
        getRecentEmails(),
      ]);
      set({ dashboardStats: stats, recentEmails: emails, loadingDashboard: false });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      set({ loadingDashboard: false });
    }
  },
  fetchInboxThreads: async () => {
    set({ loadingInbox: true });
    try {
      const threads = await getInboxThreads();
      set({ threads, loadingInbox: false });
      if (!get().selectedThreadId && threads.length > 0) {
        set({ selectedThreadId: threads[0].id });
      }
    } catch (error) {
      console.error("Failed to fetch inbox threads:", error);
      set({ loadingInbox: false });
    }
  },
  fetchLeads: async () => {
    set({ loadingLeads: true });
    try {
      const leads = await getLeads();
      set({ leads, loadingLeads: false });
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      set({ loadingLeads: false });
    }
  },
  selectThread: (threadId) => {
    set({ selectedThreadId: threadId });
  },
  generateDraftForSelectedThread: async () => {
    const { selectedThreadId, threads } = get();
    if (!selectedThreadId) return;
    set({ generatingDraft: true });
    try {
      const draftData = await generateDraft(selectedThreadId);
      const updatedThreads = threads.map(thread =>
        thread.id === selectedThreadId
          ? { ...thread, ...draftData }
          : thread
      );
      set({ threads: updatedThreads, generatingDraft: false });
    } catch (error) {
      console.error("Failed to generate draft:", error);
      set({ generatingDraft: false });
    }
  },
  fetchTemplates: async () => {
    set({ loadingTemplates: true });
    try {
      const templates = await getTemplates();
      set({ templates, loadingTemplates: false });
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      set({ loadingTemplates: false });
    }
  },
  addTemplate: async (template) => {
    const newTemplate = await createTemplate(template);
    set(state => ({ templates: [...state.templates, newTemplate] }));
  },
  editTemplate: async (id, templateUpdate) => {
    const updatedTemplate = await updateTemplate(id, templateUpdate);
    set(state => ({
      templates: state.templates.map(t => t.id === id ? updatedTemplate : t),
    }));
  },
  removeTemplate: async (id) => {
    await deleteTemplate(id);
    set(state => ({ templates: state.templates.filter(t => t.id !== id) }));
  },
  approveAndSendSelectedThread: async () => {
    const { selectedThreadId } = get();
    if (!selectedThreadId) return;
    // In a real app, this would call an API: await approveAndSend(selectedThreadId);
    set(state => ({
      threads: state.threads.map(t =>
        t.id === selectedThreadId ? { ...t, status: 'Replied' } : t
      ),
    }));
  },
  skipSelectedThread: async () => {
    const { selectedThreadId } = get();
    if (!selectedThreadId) return;
    // In a real app, this would call an API: await skipThread(selectedThreadId);
    set(state => ({
      threads: state.threads.map(t =>
        t.id === selectedThreadId ? { ...t, status: 'Skipped' } : t
      ),
    }));
  },
  pauseAutomationForSelectedThread: async () => {
    const { selectedThreadId } = get();
    if (!selectedThreadId) return;
    // In a real app, this would call an API: await pauseThreadAutomation(selectedThreadId);
    set(state => ({
      threads: state.threads.map(t =>
        t.id === selectedThreadId ? { ...t, automationPaused: true } : t
      ),
    }));
  },
  fetchAnalyticsData: async () => {
    set({ loadingAnalytics: true });
    try {
      const data = await getAnalyticsData();
      set({ analyticsData: data, loadingAnalytics: false });
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      set({ loadingAnalytics: false });
    }
  },
  toggleAutomation: () => {
    set(state => ({ automationActive: !state.automationActive }));
  },
  // Derived state
  getSelectedThread: () => {
    const { threads, selectedThreadId } = get();
    return threads.find(t => t.id === selectedThreadId);
  },
}));