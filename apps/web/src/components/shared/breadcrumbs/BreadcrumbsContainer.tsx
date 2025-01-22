'use client';

import { getBreadcrumbSegments } from '@/lib/get-breadcrumb-segments';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from './Breadcrumbs';

export function BreadcrumbsContainer() {
  const pathname = usePathname();
  const segments = getBreadcrumbSegments(pathname);

  return <Breadcrumbs routes={segments} />;
}
