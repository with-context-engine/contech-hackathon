import { SignedIn, SignedOut } from '@clerk/nextjs';
import FlickeringGrid from '@ui/components/ui/flickering-grid';
import { Bouncer } from './components/Bouncer';

export default function AuthSlot() {
  return (
    <SignedOut>
      <main className="relative min-h-screen flex items-center justify-center">
        <FlickeringGrid
          className="absolute inset-0 -z-10"
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
    </SignedOut>
  );
}
