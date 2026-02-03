import Link from "next/link";
import React from "react";
import { cn } from "../lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex">
      <aside className="w-64 border-r overflow-y-auto p-4">
        <span>Sidebar</span>
        <ul className="px-4">
          <SidebarItems path="/dashboard" pathName="Home" />
          <SidebarItems path="/dashboard/expense" pathName="Expense" />
          <SidebarItems path="/dashboard/income" pathName="Income" />
        </ul>
      </aside>
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </section>
  );
}

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
    <li className={cn("mt-2", classname)}>
      <Link href={path}>{pathName}</Link>
    </li>
  );
}
