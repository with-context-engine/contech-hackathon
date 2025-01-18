import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Bolt } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-black dark:text-white">Beem</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <SignedOut>
              <SignInButton>
                <button
                  className="text-black dark:text-white rounded-md px-4 py-2 flex items-center gap-2 group"
                  type="button"
                >
                  Get Started
                  <Bolt className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
}
