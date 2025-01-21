import { createServerClient } from '@supabase/ssr';
import type { cookies } from 'next/headers';

/**
 * Updates the session based on the incoming request.
 *
 * This function is necessary because Next.js App Router doesn't allow direct
 * cookie reading. It only provides access to the Request and Response objects.
 * As a result, we need to implement additional logic in this "Server Function"
 * to handle session management and cookie operations.
 *
 * The function creates a Supabase server client, manages cookies, checks user
 * authentication, and handles redirects for unauthenticated users.
 *
 * @param request - The incoming Next.js request object
 * @returns A NextResponse object with updated session information
 */
export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
