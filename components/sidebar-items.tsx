'use client';

import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SidebarItems({
  path,
  pathName,
  classname,
}: {
  path: string;
  pathName: string;
  classname?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <li>
      <Link
        href={path}
        className={cn(
          'block rounded-md px-4 py-2 text-sm font-medium transition-colors',
          'text-(--color-muted)',
          'hover:bg-(--color-border) hover:text-(--color-foreground)',
          isActive && 'bg-(--color-border) text-(--color-foreground)',
          classname
        )}
      >
        {pathName}
      </Link>
    </li>
  );
}
