import { redirect } from 'next/navigation';

export default function LandingPage() {
  // TODO: Add logic to check if user is authenticated
  const isAuthenticated = false;

  if (isAuthenticated) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
          <p className="mb-8">Get started by signing in</p>
          <a
            href="/login"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Sign In
          </a>
        </div>
      </main>
    </div>
  );
}
