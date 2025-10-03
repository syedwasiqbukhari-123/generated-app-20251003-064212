import React, { PropsWithChildren } from 'react';
import { NodeProps } from '@xyflow/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
export interface CustomNodeData {
  label: string;
  icon?: LucideIcon;
}
function CustomNodeComponent({ data, children }: PropsWithChildren<NodeProps<CustomNodeData>>) {
  const Icon = data.icon;
  return (
    <Card className="w-64 border-2 shadow-lg rounded-xl bg-white dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center space-x-3 p-3 border-b bg-gray-50 dark:bg-gray-800/50 rounded-t-xl">
        {Icon && <Icon className="h-5 w-5 text-indigo-500" />}
        <div className="font-semibold text-sm">{data.label}</div>
      </CardHeader>
      {children && <CardContent className="p-3">{children}</CardContent>}
    </Card>
  );
}
export const CustomNode = React.memo(CustomNodeComponent);