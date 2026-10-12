'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/Header';
import { FavoriteButton } from '@/components/FavoriteButton';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { products } from '@/data/products';

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20 flex flex-col">
      <Header />

      <main data-testid="favorites-page" className="container mx-auto px-4 py-8 flex-1 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              data-testid="link-back"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group mb-3"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Store</span>
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Heart className="w-7 h-7 text-red-500 fill-red-500" />
              <span>My Favorites</span>
            </h1>
          </div>
          <p className="text-sm text-muted-foreground self-end pb-1">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div
            data-testid="favorites-empty"
            className="text-center py-20 px-4 rounded-3xl border border-dashed bg-muted/20 flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/40 text-red-500 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              You haven&apos;t added any products to your favorites list. Explore our catalog and tap the heart icon on items you love.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Products</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                data-testid="favorite-item"
                className="bg-card border rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0 border">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold truncate">
                      {product.name}
                    </h3>
                    <p className="text-base font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0">
                  <Link
                    href={`/products/${product.id}`}
                    data-testid="link-detail"
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    View Details
                  </Link>

                  <FavoriteButton productId={product.id} className="border" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
