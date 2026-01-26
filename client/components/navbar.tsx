'use client';

import Link from 'next/link';
import { Play as Paw } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            
            <span className="font-bold text-lg text-foreground">Pups & Paws</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Home
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}
