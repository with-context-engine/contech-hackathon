'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useGraphStore } from '@/store/graph-store';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const { nodes } = useGraphStore();
  const { fitView, setCenter } = useReactFlow();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Check for cmd+/ on Mac or ctrl+/ on Windows/Linux
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setCenter(node.position.x, node.position.y, { zoom: 1.5, duration: 800 });
    }
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search nodes... (⌘/)" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Nodes">
          {nodes.map((node) => (
            <CommandItem
              key={node.id}
              value={node.data.label}
              onSelect={() => handleSelect(node.id)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>{node.data.label}</span>
              <span className="ml-2 text-xs text-muted-foreground">
                {node.type}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
