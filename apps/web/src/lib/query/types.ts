import { Node } from 'reactflow';

export interface NodeData {
  label: string;
  details: string;
  category: string;
  expandable: boolean;
  link?: string;
}

export interface GraphNode {
  id: string;
  type: 'concept' | 'material' | 'technique' | 'regulation';
  position: { x: number; y: number };
  data: {
    label: string;
    details: string;
    category: string;
    expandable: boolean;
    link?: string;
  };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: NodeData;
}

export interface GraphQueryResult {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface DatabaseQuery {
  tables: string[];
  conditions: Record<string, string | number | boolean | null>;
  relationships: string[];
}
