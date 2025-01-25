'use client';

import { Command, CommandInput, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { processNaturalLanguageQuery } from '@/lib/query/llm-client';
import type { GraphQueryResult } from '@/lib/query/types';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface QueryCommandProps {
  onQueryResult: (result: GraphQueryResult) => void;
}

export function QueryCommand({ onQueryResult }: QueryCommandProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === ' ' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleQuery = async (value: string) => {
    setIsLoading(true);
    try {
      const result = await processNaturalLanguageQuery(value);
      onQueryResult(result);
      setOpen(false);
    } catch (error) {
      console.error('Query processing failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Ask about the construction knowledge graph..."
            value={query}
            onValueChange={setQuery}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleQuery(query);
              }
            }}
          />
          <CommandList>
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Processing query...</span>
              </div>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
