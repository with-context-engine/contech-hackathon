export function getBreadcrumbSegments(pathname: string): string[] {
  // Remove leading and trailing slashes and split into segments
  const segments = pathname.split('/').filter((segment) => segment !== '');

  // Filter out any dynamic route segments (those starting with '[' and ending with ']')
  // and parallel route segments (those starting with '@')
  return segments.filter(
    (segment) =>
      !segment.startsWith('[') &&
      !segment.endsWith(']') &&
      !segment.startsWith('@'),
  );
}
