import { ClerkProvider } from '@clerk/nextjs';
import { ThemeScript } from 'next-app-theme/theme-script';
import type React from 'react';

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <ThemeScript />
      {children}
    </ClerkProvider>
  );
}
