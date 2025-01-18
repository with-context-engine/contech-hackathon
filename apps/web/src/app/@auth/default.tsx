import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Bouncer } from './components/Bouncer';

export default function AuthSlot() {
  return (
    <SignedOut>
      <Bouncer />
    </SignedOut>
  );
}
