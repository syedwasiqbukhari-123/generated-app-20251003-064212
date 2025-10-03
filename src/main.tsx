import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css';
// Layouts
import { AppLayout } from '@/components/layout/AppLayout';
// Pages
import { HomePage } from '@/pages/HomePage';
import { OnboardingFlow } from '@/pages/onboarding/OnboardingFlow';
import { DashboardPage } from '@/pages/DashboardPage';
import { InboxPage } from '@/pages/InboxPage';
import { ScenariosPage } from '@/pages/ScenariosPage';
import { TemplatesPage } from '@/pages/TemplatesPage';
import { LeadsPage } from '@/pages/LeadsPage';
import { ConnectionsPage } from '@/pages/ConnectionsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { App } from "./App";
export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
    element: <HomePage />,
  },
  {
    path: "/onboarding/:step",
    element: <OnboardingFlow />,
  },
  {
    element: <AppLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/inbox", element: <InboxPage /> },
      { path: "/automations/scenarios", element: <ScenariosPage /> },
      { path: "/automations/templates", element: <TemplatesPage /> },
      { path: "/leads", element: <LeadsPage /> },
      { path: "/connections", element: <ConnectionsPage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/analytics", element: <AnalyticsPage /> },
      // Redirect for base automations path
      { path: "/automations", element: <ScenariosPage />, index: true },
    ],
  },
],
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);