import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import React from 'react';

export const Sidebar = () => {
  return (
    <aside className="w-64 overflow-y-auto border-r border-neutral-400">
      <p className="px-4 py-6 text-lg font-bold">Pluto</p>
      <ul className="">
        <SidebarItems path="/dashboard" pathName="Dashboard" />
        <SidebarItems path="/dashboard/expense" pathName="Expense" />
        <SidebarItems path="/dashboard/income" pathName="Income" />
        <SidebarItems path="/dashboard/staff" pathName="Daily attendees" />
      </ul>
    </aside>
  );
};

function SidebarItems({
  path,
  pathName,
  classname,
}: {
  path: string;
  pathName: string;
  classname?: string;
}) {
  return (
    <li className={cn('mb-2 bg-neutral-800/70 px-4 py-0.5', classname)}>
      <Link href={path}>{pathName}</Link>
    </li>
  );
}
