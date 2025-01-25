'use client';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Handle, type NodeProps, Position } from 'reactflow';

const nodeColors = {
  concept: 'bg-blue-100 dark:bg-blue-900',
  material: 'bg-green-100 dark:bg-green-900',
  technique: 'bg-purple-100 dark:bg-purple-900',
  regulation: 'bg-orange-100 dark:bg-orange-900',
};

export function BaseNode({ data, type }: NodeProps) {
  return (
    <div className="group">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-muted-foreground"
      />
      <Card
        className={cn(
          'min-w-[200px] transition-all duration-200',
          'hover:shadow-lg hover:scale-105',
          nodeColors[type as keyof typeof nodeColors],
        )}
      >
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-medium">{data.label}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2 text-xs">{data.details}</CardContent>
      </Card>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-muted-foreground"
      />
    </div>
  );
}
