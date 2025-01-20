import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeScript } from 'next-app-theme/theme-script';
import type React from 'react';

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <ThemeScript />
      {children}
    </ClerkProvider>
  );
}
