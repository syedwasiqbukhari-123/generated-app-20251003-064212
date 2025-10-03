import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { CustomNode, CustomNodeData } from './CustomNode';
import { Send } from 'lucide-react';
function ActionNodeComponent(props: NodeProps<CustomNodeData>) {
  return (
    <CustomNode {...props} data={{ ...props.data, icon: Send }}>
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-indigo-500" />
    </CustomNode>
  );
}
export const ActionNode = React.memo(ActionNodeComponent);