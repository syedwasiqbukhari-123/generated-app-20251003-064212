import { Node, Edge } from '@xyflow/react';
import { Mail, Clock, MessageSquare, Send, GitBranch, LucideIcon } from 'lucide-react';
export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 100, y: 150 },
    data: { label: 'New Lead Received' },
  },
  {
    id: '2',
    type: 'filter',
    position: { x: 400, y: 150 },
    data: { label: 'Check Business Hours' },
  },
  {
    id: '3',
    type: 'action',
    position: { x: 700, y: 50 },
    data: { label: 'Send Auto-Reply' },
  },
  {
    id: '4',
    type: 'action',
    position: { x: 700, y: 250 },
    data: { label: 'Queue for Review' },
  },
];
export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', sourceHandle: 'true', target: '3', label: 'During hours', animated: true },
  { id: 'e2-4', source: '2', sourceHandle: 'false', target: '4', label: 'Outside hours', animated: true },
];
export interface DraggableNode {
  type: 'trigger' | 'filter' | 'action';
  label: string;
  icon: LucideIcon;
}
export const availableNodes: DraggableNode[] = [
  { type: 'trigger', label: 'New Lead', icon: Mail },
  { type: 'filter', label: 'Business Hours', icon: Clock },
  { type: 'filter', label: 'Check Language', icon: GitBranch },
  { type: 'action', label: 'Send Reply', icon: Send },
  { type: 'action', label: 'Queue for Review', icon: MessageSquare },
];