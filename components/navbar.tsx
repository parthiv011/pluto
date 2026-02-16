import { User } from 'lucide-react';
import React from 'react';
import { ModeToggle } from './ui/mode-toggle';

export const Navbar = () => {
  return (
    <header className="border-border flex h-16 items-center justify-end border-b px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm">Harvey Spector</p>
          <User className="size-4" />
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};
