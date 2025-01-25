interface NodeData {
  [key: string]: string | number | boolean | null;
}

export interface GraphNode {
  id: string;
  type: string;
  data: NodeData;
  position: { x: number; y: number };
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
