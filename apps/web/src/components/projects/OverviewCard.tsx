import type { ProjectOverview } from '@/types/ProjectOverview';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import { InlineEdit } from '@ux/src';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  project: ProjectOverview;
  onDelete?: (projectId: string) => Promise<void>;
  onDuplicate?: (projectId: string) => Promise<void>;
  onUpdate?: (
    projectId: string,
    updates: Partial<ProjectOverview>,
  ) => Promise<void>;
}

const WorkflowCard = ({
  project,
  onDelete,
  onDuplicate,
  onUpdate,
}: ProjectCardProps) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden group">
      <div className="relative">
        <div className="relative aspect-video">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            {/* @ts-expect-error - Suppressing false positive with Radix UI tooltip */}
            <DropdownMenuContent align="end">
              {/* @ts-expect-error - Suppressing false positive with Radix UI tooltip */}
              <DropdownMenuItem
                onClick={() => onDuplicate?.(project.projectId)}
              >
                Duplicate
              </DropdownMenuItem>
              {/* @ts-expect-error - Suppressing false positive with Radix UI tooltip */}
              <DropdownMenuItem onClick={() => onDelete?.(project.projectId)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">
          <InlineEdit
            value={project.name}
            onChange={(newName) =>
              onUpdate?.(project.projectId, { name: newName })
            }
          />
        </CardTitle>
        <CardDescription>
          <InlineEdit
            value={project.description}
            onChange={(newDescription) =>
              onUpdate?.(project.projectId, { description: newDescription })
            }
            multiline
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default WorkflowCard;
