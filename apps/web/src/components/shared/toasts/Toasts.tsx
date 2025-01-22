import { useToast } from '@repo/ui/hooks/use-toast';
import { useEffect } from 'react';

interface SitePlanLoadErrorToastProps {
  error: string;
}

export function SitePlanLoadErrorToast({ error }: SitePlanLoadErrorToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: '❌ Error Loading Site Plan',
      description: error || 'Failed to load site plan. Please try again later.',
      variant: 'destructive',
    });
  }, [toast, error]);

  return null;
}
