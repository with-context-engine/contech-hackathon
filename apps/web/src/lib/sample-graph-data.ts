import type { Edge, Node } from 'reactflow';

export const initialNodes: Node[] = [
  {
    id: 'building-1088864',
    type: 'concept',
    data: {
      label: 'Building BIN: 1088864',
      details: 'NYC Building Information System Record',
      category: 'concept',
      expandable: true,
    },
    position: { x: 0, y: 0 },
  },
  // Generate CO nodes in a circular pattern around the building node
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `co-${i}`,
    type: 'regulation',
    data: {
      label: `Certificate of Occupancy ${i + 1}`,
      details: 'Building Certificate of Occupancy Document',
      category: 'regulation',
      expandable: true,
      link: 'https://a810-bisweb.nyc.gov/bisweb/CofoDocumentContentServlet?bin=1088864&passcofonumber=120486116-01.PDF&requestid=0&cofomatadata1=COFO&cofomatadata2=M&cofomatadata3=120&cofomatadata4=486000&cofomatadata5=120486116-01.PDF',
    },
    position: {
      x: 500 * Math.cos((2 * Math.PI * i) / 7),
      y: 500 * Math.sin((2 * Math.PI * i) / 7),
    },
  })),
];

export const initialEdges: Edge[] = [
  // Generate edges connecting building to each CO node
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `e-building-co${i}`,
    source: 'building-1088864',
    target: `co-${i}`,
    label: 'has document',
    type: 'dependency',
  })),
];
