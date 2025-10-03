import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, PlayCircle, Save } from 'lucide-react';
import { ScenarioBuilderWrapper } from '@/components/scenarios/ScenarioBuilder';
import { ScenarioSidebar } from '@/components/scenarios/Sidebar';
export const ScenariosPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Default Scenario</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">This is the primary flow for handling all incoming leads.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => console.log('Toggling Test Mode...')}>
            <PlayCircle className="mr-2 h-4 w-4" /> Test Mode
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => console.log('Saving changes...')}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>
      <div className="flex h-[calc(100vh-250px)] border rounded-lg bg-white dark:bg-gray-950 shadow-sm">
        <div className="flex-1 h-full">
          <ScenarioBuilderWrapper />
        </div>
        <ScenarioSidebar />
      </div>
    </div>
  );
};