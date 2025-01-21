import { type NextRequest, NextResponse } from 'next/server';

/**
 * Generates a placeholder SVG image with specified dimensions and dark mode compatibility
 *
 * @param req - The Next.js API request object
 * @returns SVG image response
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const width = searchParams.get('width') || '300';
  const height = searchParams.get('height') || '200';
  const darkMode = searchParams.get('dark') === 'true';

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${darkMode ? '#2f3e4e' : '#f3f4f6'}"/>
    </svg>
  `.trim();

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
