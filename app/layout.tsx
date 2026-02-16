import './globals.css';

import type { Metadata } from 'next';
import { Rethink_Sans } from 'next/font/google';
import Providers from '@/providers';

const rethink = Rethink_Sans({
  variable: '--font-rethink',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pluto-Cashflow Intelligence',
  description: 'Cashflow intelligence platform for freelancers and businesses',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rethink.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
