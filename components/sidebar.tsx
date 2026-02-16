'use client';

import {
  BanknoteArrowUp,
  BookOpenCheck,
  LayoutDashboard,
  PanelRightOpen,
  UserCheck,
  Wallet,
} from 'lucide-react';
import { SidebarItems } from './sidebar-items';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/app/lib/utils';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`border-border overflow-y-auto border-r py-6 pt-5 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="flex items-center justify-between px-4">
        {!isCollapsed && <p className="text-xl font-bold">Pluto</p>}
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <PanelRightOpen
            className={`hover:text-foreground text-muted size-5 ${isCollapsed ? 'rotate-180' : ''}`}
            focusable="false"
          />
        </Button>
      </div>
      <hr className="my-6 border-transparent" />
      <ul className="space-y-6 px-2">
        <li>
          <p
            className={cn(
              'overflow-hidden px-2 text-sm font-semibold transition-all duration-200',
              isCollapsed
                ? 'mb-0 max-h-0 opacity-0'
                : 'mb-2 max-h-10 opacity-100'
            )}
          >
            Main
          </p>

          <ul className="space-y-1">
            <SidebarItems
              path="/dashboard"
              pathName="Dashboard"
              icon={<LayoutDashboard />}
              collapsed={isCollapsed}
            />
            <SidebarItems
              path="/dashboard/expense"
              pathName="Expense"
              icon={<Wallet />}
              collapsed={isCollapsed}
            />
            <SidebarItems
              path="/dashboard/income"
              pathName="Income"
              icon={<BanknoteArrowUp />}
              collapsed={isCollapsed}
            />
          </ul>
        </li>

        <li>
          <p
            className={cn(
              'overflow-hidden px-2 text-sm font-semibold transition-all duration-200',
              isCollapsed
                ? 'mb-0 max-h-0 opacity-0'
                : 'mb-2 max-h-10 opacity-100'
            )}
          >
            Management
          </p>

          <ul className="space-y-1">
            <SidebarItems
              path="/dashboard/staff"
              pathName="Daily attendees"
              collapsed={isCollapsed}
              icon={<UserCheck />}
            />
            <SidebarItems
              path="/dashboard/wages"
              pathName="Daily wages"
              icon={<BookOpenCheck />}
              collapsed={isCollapsed}
            />
          </ul>
        </li>
      </ul>
    </aside>
  );
};
