'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Menu } from 'lucide-react';

export default function MenuButton() {
  return (
    <Button size="icon" variant="outline" onClick={() => {}}>
      <Menu className="h-6 w-6" />
    </Button>
  );
}
