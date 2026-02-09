import React from 'react';
import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </section>
  );
}
