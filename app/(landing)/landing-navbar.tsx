'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export const HomeNavbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full">
      <div className="bg-background mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold">Pluto</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#testimonials">Customers</Link>
          <Link href="#resources">Resources</Link>
        </div>

        {/* Right Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="secondary" onClick={() => router.push('/signin')}>
            Sign in
          </Button>
          <Button onClick={() => router.push('/signup')}>
            Start Free Trial
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="bg-background border-border absolute top-16 left-0 w-full border-t shadow-lg md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4 text-sm font-medium">
            <Link href="#features" onClick={() => setOpen(false)}>
              Features
            </Link>
            <Link href="#pricing" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link href="#testimonials" onClick={() => setOpen(false)}>
              Customers
            </Link>
            <Link href="#resources" onClick={() => setOpen(false)}>
              Resources
            </Link>

            <div className="flex flex-col gap-2 pt-4">
              <Button
                variant="secondary"
                onClick={() => router.push('/signin')}
              >
                Sign in
              </Button>
              <Button onClick={() => router.push('/signup')}>
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
