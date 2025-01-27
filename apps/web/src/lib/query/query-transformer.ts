import type { DatabaseQuery, GraphQueryResult } from './types';

interface DatabaseResult {
  id: string;
  [key: string]: string | number | boolean | null;
}

export function transformQueryResults(
  dbResults: DatabaseResult[],
  query: DatabaseQuery,
): GraphQueryResult {
  return {
    nodes: dbResults.map((result, index) => ({
      id: `node-${index}`,
      type: 'concept',
      data: {
        label: result.id,
        details: JSON.stringify(result),
        category: 'concept',
        expandable: true,
      },
      position: { x: index * 100, y: 0 },
    })),
    edges: [],
  };
}
