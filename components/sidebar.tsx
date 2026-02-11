import { PanelRightOpen } from 'lucide-react';
import { SidebarItems } from './sidebar-items';
import { Button } from './ui/button';

export const Sidebar = () => {
  return (
    <aside className="border-border w-64 overflow-y-auto border-r py-6">
      <div className="flex items-center justify-between px-4">
        <p className="text-xl font-bold">Pluto</p>
        <Button variant="ghost" className="p-0">
          <PanelRightOpen
            className="hover:text-foreground text-muted size-5"
            focusable="false"
          />
        </Button>
      </div>
      <hr className="text-border my-4" />
      <ul className="space-y-6 px-2">
        <li>
          <p className="mb-2 px-2 text-sm font-semibold">Main</p>
          <ul className="space-y-1">
            <SidebarItems path="/dashboard" pathName="Dashboard" />
            <SidebarItems path="/dashboard/expense" pathName="Expense" />
            <SidebarItems path="/dashboard/income" pathName="Income" />
          </ul>
        </li>

        <li>
          <p className="mb-2 px-2 text-sm font-semibold">Management</p>
          <ul className="space-y-1">
            <SidebarItems path="/dashboard/staff" pathName="Daily attendees" />
            <SidebarItems path="/dashboard/wages" pathName="Daily wages" />
          </ul>
        </li>
      </ul>
    </aside>
  );
};
