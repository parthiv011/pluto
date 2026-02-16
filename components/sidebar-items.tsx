'use client';

import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export function SidebarItems({
  path,
  pathName,
  classname,
  icon,
  collapsed = false,
}: {
  path: string;
  pathName: string;
  classname?: string;
  icon?: React.ReactNode;
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <li>
      <Link
        href={path}
        className={cn(
          'flex items-center rounded-md py-2 text-sm font-medium transition-all duration-200',
          collapsed ? 'justify-center px-2' : 'gap-3 px-4',
          'text-(--color-muted)',
          'hover:bg-(--color-border) hover:text-(--color-foreground)',
          isActive && 'bg-(--color-border) text-(--color-foreground)',
          classname
        )}
      >
        {icon && (
          <span className="flex size-4 items-center justify-center">
            {icon}
          </span>
        )}

        <span
          className={cn(
            'whitespace-nowrap transition-all duration-200',
            collapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'
          )}
        >
          {pathName}
        </span>
      </Link>
    </li>
  );
}
