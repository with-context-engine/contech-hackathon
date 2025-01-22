import { auth } from '@clerk/nextjs/server';
import { createServerClient } from '@supabase/ssr';

export async function InstantiateClerkSupabaseClient() {
  const { getToken } = await auth();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get: async (name: string) => {
        const ClerkToken = await getToken({ template: 'supabase' });
        return ClerkToken;
      },
    },
    global: {
      fetch: async (url: string | URL | Request, options = {}) => {
        const ClerkToken = await getToken({ template: 'supabase' });
        if (!ClerkToken) return new Response('Unauthorized', { status: 401 });

        const headers = new Headers();
        headers.set('Authorization', `Bearer ${ClerkToken}`);

        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });
}
