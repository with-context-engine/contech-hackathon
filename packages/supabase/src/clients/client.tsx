import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a Supabase browser client.
 *
 * This function is used to create a Supabase client that can be used in
 * browser-side code (e.g., Next.js pages, components).
 *
 * @returns A Supabase browser client
 */
export function createFrontendClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
