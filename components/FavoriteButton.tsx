'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

interface FavoriteButtonProps {
  productId: number;
  className?: string;
  showText?: boolean;
}

export function FavoriteButton({
  productId,
  className = '',
  showText = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  return (
    <button
      type="button"
      data-testid="btn-favorite"
      aria-pressed={favorited ? 'true' : 'false'}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full p-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        favorited
          ? 'bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400'
          : 'bg-background/80 text-muted-foreground backdrop-blur-sm hover:bg-background hover:text-foreground shadow-sm border border-border/50'
      } ${className}`}
    >
      <Heart
        className={`w-5 h-5 transition-transform duration-200 active:scale-125 ${
          favorited ? 'fill-red-500 text-red-500' : 'stroke-current'
        }`}
      />
      {showText && (
        <span className="text-sm font-medium pr-1">
          {favorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
}
