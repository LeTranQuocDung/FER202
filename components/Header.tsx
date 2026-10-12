'use client';

import Link from 'next/link';
import { Heart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';

export function Header() {
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Lumina
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/favorites"
                data-testid="link-favorites"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30"
              >
                <Heart className="w-4 h-4 fill-current text-red-500" />
                <span className="hidden sm:inline">Favorites</span>
                <span
                  data-testid="favorites-count"
                  className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-4"
                >
                  {favorites.length}
                </span>
              </Link>

              <Link
                href="/account"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors"
              >
                <User className="w-4 h-4 hidden sm:block" />
                <span data-testid="user-email" className="truncate max-w-[120px] sm:max-w-[200px]">
                  {user.email}
                </span>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                data-testid="btn-logout"
                onClick={() => signOut()}
                className="font-medium hover:bg-destructive/10 hover:text-destructive flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" data-testid="btn-login" className="font-medium hover:bg-primary/10">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button data-testid="btn-register" className="font-medium bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
