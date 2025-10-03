import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { CustomNode, CustomNodeData } from './CustomNode';
import { Mail } from 'lucide-react';
function TriggerNodeComponent(props: NodeProps<CustomNodeData>) {
  return (
    <CustomNode {...props} data={{ ...props.data, icon: Mail }}>
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-indigo-500" />
    </CustomNode>
  );
}
export const TriggerNode = React.memo(TriggerNodeComponent);