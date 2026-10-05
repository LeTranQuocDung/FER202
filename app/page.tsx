'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-12">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Lumina</h1>
          </div>
          <div className="flex gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span data-testid="user-email" className="text-sm font-medium">{user.email}</span>
                <Button variant="ghost" data-testid="btn-logout" onClick={() => signOut()} className="font-medium hover:bg-primary/10">Logout</Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" data-testid="btn-login" className="font-medium hover:bg-primary/10">Login</Button>
                </Link>
                <Link href="/register">
                  <Button data-testid="btn-register" className="font-medium bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Premium Hero Section */}
        <div className="py-20 md:py-28 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            ✨ New Collection Available
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Elevate your lifestyle with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">premium</span> essentials.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-4">
            Discover our carefully curated selection of high-quality products designed to bring elegance and functionality to your everyday life.
          </p>
          <div className="pt-4">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 shadow-xl">
              Shop Now
            </Button>
          </div>
        </div>

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">Featured Products</h3>
            <p className="text-muted-foreground mt-2">Handpicked pieces just for you.</p>
          </div>
        </div>

        <div 
          data-testid="product-list" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
