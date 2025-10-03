import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
      <Sidebar />
      <main className="flex-1">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};