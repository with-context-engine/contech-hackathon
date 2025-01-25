import { useState } from 'react';
import { BaseEdge, type EdgeProps, getStraightPath } from 'reactflow';

export function SimpleEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style,
  id,
  selected,
}: EdgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      {/* Wider invisible edge for easier hover */}
      <path
        d={edgePath}
        fill="none"
        strokeWidth={20}
        stroke="transparent"
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: isHovered ? 3 : 2,
          stroke: isHovered
            ? 'hsl(var(--primary))'
            : selected
              ? 'hsl(var(--primary) / 0.7)'
              : 'hsl(var(--foreground) / 0.5)',
          transition: 'all 0.2s ease-in-out',
        }}
      />
    </>
  );
}
