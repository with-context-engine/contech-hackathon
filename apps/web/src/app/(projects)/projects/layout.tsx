import { SignedIn } from '@clerk/nextjs';
import '@repo/ui/globals.css';
import type React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SignedIn>
      <div>{children}</div>
    </SignedIn>
  );
}
