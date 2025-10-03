import React from 'react';
import { availableNodes } from '@/lib/scenarioUtils';
export const ScenarioSidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: nodeType, label }));
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <aside className="w-72 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 p-4">
      <h3 className="text-lg font-semibold mb-4">Nodes</h3>
      <div className="space-y-3">
        {availableNodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.label}
              className="p-3 border rounded-lg flex items-center cursor-grab bg-gray-50 dark:bg-gray-900 hover:shadow-md hover:border-indigo-500 transition-all"
              onDragStart={(event) => onDragStart(event, node.type, node.label)}
              draggable
            >
              <Icon className="h-5 w-5 mr-3 text-indigo-500" />
              <span className="text-sm font-medium">{node.label}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};