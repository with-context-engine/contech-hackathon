'use client';

import { Content } from '@/components/shared/sidebar/_content/Content';
import { ClerkUser } from '@/components/shared/sidebar/_footer/ClerkUser';
import { Heading } from '@/components/shared/sidebar/_header/Heading';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  useSidebar,
} from '@repo/ui/components/ui/sidebar';
import { HardHatIcon } from 'lucide-react';
import { type ComponentProps, useCallback, useRef } from 'react';
const data = {
  navContent: [
    {
      title: 'Projects',
      icon: HardHatIcon,
      isActive: true,
      href: '/projects',
    },
  ],
};

export function NavigationMenu({ ...props }: ComponentProps<typeof Sidebar>) {
  const { setOpen } = useSidebar();
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 500);
  }, [setOpen]);

  const handleMouseEnter = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setOpen(true);
  }, [setOpen]);

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <SidebarHeader>
        <Heading />
      </SidebarHeader>
      <SidebarContent>
        <Content items={data.navContent} />
      </SidebarContent>
      <SidebarFooter>
        <ClerkUser />
      </SidebarFooter>
    </Sidebar>
  );
}

export function ContentInset() {
  const { setOpen } = useSidebar();

  return (
    <SidebarInset>
      <div
        className="absolute left-0 top-0 h-full w-4 cursor-pointer"
        onMouseEnter={() => setOpen(false)}
      />
    </SidebarInset>
  );
}
