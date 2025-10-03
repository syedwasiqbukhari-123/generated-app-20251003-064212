import React from 'react';
import { Outlet } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-grow">
        <Outlet />
      </div>
      <footer className="text-center p-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p className="mt-1">Its Just a UX/UI Prototype</p>
      </footer>
    </div>
  );
};
export { App };