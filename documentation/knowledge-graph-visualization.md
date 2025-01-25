# Construction Knowledge Graph Visualization

## Overview
This document outlines the frontend implementation plan for a dynamic construction knowledge graph visualization system using React Flow, with integrated LLM-powered search and query capabilities within the Next.js app router architecture.

## Core Components

### 1. Search Interface
- Implement a Shadcn UI Command Menu (ctrl+/) for direct node search
- Add typeahead suggestions for node navigation
- Include recent searches in dropdown
- Integrate with existing layout structure

### 2. Natural Language Query Interface
- Implement command menu (ctrl+space) for LLM-powered queries
- Natural language to database query translation flow:
  1. User inputs natural language query
  2. Query sent to LLM endpoint for translation
  3. LLM generates structured database query based on schema
  4. Execute query against database
  5. Transform results into graph nodes/edges
  6. Animate new nodes into view

### 3. Graph Visualization
- Implement React Flow within a client component
- Create custom nodes for construction entities
- Add smooth pan/zoom with minimap
- Implement node expansion animations
- Add context menu for node actions
- Handle dynamic node/edge addition from queries

## Project Structure

```typescript
src/
├── app/
│   └── (projects)/
│       └── projects/
│           └── [uuid]/
│               ├── page.tsx           # Main graph view
│               ├── loading.tsx        # Loading state
│               └── error.tsx          # Error handling
├── components/
│   ├── knowledge-graph/
│   │   ├── Graph.tsx                 # Client component wrapper
│   │   ├── SearchCommand.tsx         # Direct node search (ctrl+/)
│   │   ├── QueryCommand.tsx          # LLM query interface (ctrl+space)
│   │   ├── nodes/                    # Node components
│   │   └── query/
│   │       ├── llm-client.ts         # LLM API client
│   │       ├── query-transformer.ts   # Query result transformer
│   │       └── schema.ts             # Database schema types
├── lib/
│   ├── graph-utils.ts                # Graph helper functions
│   └── api.ts                        # API client
└── store/
    └── graph-store.ts               # Zustand store
```

## Query Flow Implementation

### 1. Natural Language Query Process
```typescript
interface QueryFlow {
  input: string;                    // User's natural language query
  llmTranslation: DatabaseQuery;    // Structured query from LLM
  results: QueryResults;            // Database query results
  graphElements: {                  // New elements to add to graph
    nodes: Node[];
    edges: Edge[];
  };
}
```

### 2. LLM Integration
```typescript
// Example curl command structure for LLM
curl -X POST https://api.llm-endpoint.com/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Show me all concrete materials connected to sustainability regulations",
    "schema": {
      "tables": [...],
      "relationships": [...]
    }
  }'
```

### 3. Graph Updates
- Implement smooth transitions for new nodes
- Highlight new connections
- Provide visual feedback during query processing
- Allow undo/redo of query results

## Keyboard Shortcuts
- `ctrl + /`: Open direct node search
- `ctrl + space`: Open natural language query interface
- `esc`: Close active dialog
- `enter`: Execute query
- `ctrl + z`: Undo last query
- `ctrl + shift + z`: Redo query

## Implementation Phases

### Phase 1: Core Search
1. Implement direct node search (ctrl+/)
2. Add basic node filtering
3. Setup keyboard shortcuts
4. Add recent searches

### Phase 2: LLM Query Interface
1. Create QueryCommand component
2. Implement LLM client
3. Add query transformation
4. Setup result handling

### Phase 3: Graph Integration
1. Add dynamic node addition
2. Implement edge creation
3. Add transition animations
4. Setup undo/redo

### Phase 4: Advanced Features
1. Add query history
2. Implement result caching
3. Add advanced filtering
4. Optimize performance

## Performance Considerations
- Stream LLM responses
- Batch graph updates
- Cache recent queries
- Optimize node rendering

## Next Steps
1. Update SearchCommand to use ctrl+/
2. Create QueryCommand component
3. Implement LLM client
4. Add query transformation logic
5. Setup graph update handling

## Accessibility
- Implement keyboard navigation
- Add screen reader support
- Maintain proper focus management
- Include ARIA labels

## Future Enhancements
- Graph history navigation
- Export functionality
- Collaborative features
- Advanced filtering
- Custom layouts
- Mobile optimization