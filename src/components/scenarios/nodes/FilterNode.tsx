import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { CustomNode, CustomNodeData } from './CustomNode';
import { Clock } from 'lucide-react';
function FilterNodeComponent(props: NodeProps<CustomNodeData>) {
  return (
    <CustomNode {...props} data={{ ...props.data, icon: Clock }}>
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-indigo-500" />
      <div className="relative">
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          style={{ top: '33%' }}
          className="w-2 h-2 !bg-green-500"
        />
        <div className="text-xs text-right pr-5 py-1">True</div>
      </div>
      <div className="relative">
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          style={{ top: '66%' }}
          className="w-2 h-2 !bg-red-500"
        />
        <div className="text-xs text-right pr-5 py-1">False</div>
      </div>
    </CustomNode>
  );
}
export const FilterNode = React.memo(FilterNodeComponent);