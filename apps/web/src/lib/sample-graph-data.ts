import type { Edge, Node } from 'reactflow';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'concept',
    data: {
      label: 'Construction Methods',
      details: 'Overview of construction methodologies',
      category: 'concept',
      expandable: true,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'material',
    data: {
      label: 'Concrete',
      details: 'Fundamental building material',
      category: 'material',
      expandable: true,
    },
    position: { x: 400, y: 200 },
  },
  {
    id: '3',
    type: 'technique',
    data: {
      label: 'Reinforcement',
      details: 'Steel reinforcement techniques',
      category: 'technique',
      expandable: true,
    },
    position: { x: -400, y: 200 },
  },
  {
    id: '4',
    type: 'regulation',
    data: {
      label: 'Building Codes',
      details: 'Relevant building regulations',
      category: 'regulation',
      expandable: true,
    },
    position: { x: 0, y: 400 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'uses',
    type: 'default',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: 'implements',
    type: 'default',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    label: 'requires',
    type: 'dependency',
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    label: 'complies with',
    type: 'related',
  },
];
