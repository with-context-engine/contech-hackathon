import type { TCOLocation } from '@/types/tco';

export async function getTCOData(): Promise<TCOLocation[]> {
  // Replace this with your actual data fetching logic
  const response = await fetch('/api/tco-data');
  const data = await response.json();
  return data;
}
