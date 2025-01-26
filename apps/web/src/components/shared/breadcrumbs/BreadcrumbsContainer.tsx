'use client';

import { getBreadcrumbSegments } from '@/lib/get-breadcrumb-segments';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from './Breadcrumbs';

function BreadcrumbsWrapper() {
  const pathname = usePathname();
  const segments = getBreadcrumbSegments(pathname);

  return <Breadcrumbs routes={segments} />;
}

export function BreadcrumbsContainer() {
  return <BreadcrumbsWrapper />;
}
