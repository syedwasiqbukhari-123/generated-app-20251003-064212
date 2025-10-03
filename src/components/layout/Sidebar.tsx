import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Bot,
  FileText,
  Users,
  Plug,
  Settings,
  BarChart2,
  LifeBuoy,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ThemeToggle } from '@/components/ThemeToggle';
const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inbox', icon: Inbox, label: 'Inbox & Queue' },
  { to: '/automations/scenarios', icon: Bot, label: 'Scenarios' },
  { to: '/automations/templates', icon: FileText, label: 'Templates' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/connections', icon: Plug, label: 'Connections' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
];
const bottomNavItems = [
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/help', icon: LifeBuoy, label: 'Help/Docs' },
];
export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <Mail className="h-7 w-7 text-indigo-600" />
        <h1 className="ml-3 text-xl font-bold tracking-tighter text-gray-900 dark:text-white">Zenith Inbox</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200',
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100'
                    )
                  }
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gray-800 text-white border-none">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <div className="mt-auto px-4 py-6 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <TooltipProvider delayDuration={0}>
          {bottomNavItems.map((item) => (
             <Tooltip key={item.to}>
             <TooltipTrigger asChild>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200',
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100'
                    )
                  }
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gray-800 text-white border-none">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
        <div className="flex justify-center pt-2">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};