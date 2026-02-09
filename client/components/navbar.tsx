'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Play as Paw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    router.push('/');
  };

  const handleHomeClick = () => {
    // Determine home page based on current route context
    const isNgoContext = pathname.startsWith('/ngo');
    const homeHref = isNgoContext ? '/ngo' : '/';

    // Check if already on home page
    const isAlreadyHome = isNgoContext ? pathname === '/ngo' : pathname === '/';

    if (isAlreadyHome) {
      // Smoothly scroll to top if already on home page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to correct home page
      router.push(homeHref);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 0);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Paw className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground">Pups & Paws</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={handleHomeClick}
              className="text-foreground hover:text-primary transition-colors text-sm font-medium cursor-pointer"
            >
              Home
            </button>
            
            {/* Auth Buttons */}
            {loading ? null : user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {user.name}
                </span>
                {user.user_type === 'NGO' && (
                  <Link href="/ngo/add-pet">
                    <Button variant="outline" size="sm">
                      Add Pet
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
