'use client';

import { Bouncer } from '@components/authentication/Bouncer';
import FlickeringGrid from '@repo/ui/components/ui/flickering-grid';

export function SignedOutView() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <FlickeringGrid
        className="absolute -z-10"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.1}
        flickerChance={0.1}
      />
      <div className="size-full flex items-center justify-center">
        <Bouncer />
      </div>
    </main>
  );
}
