'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

type FavoritesState = number[];

type FavoritesAction =
  | { type: 'SET'; payload: number[] }
  | { type: 'ADD'; payload: number }
  | { type: 'REMOVE'; payload: number };

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return state.includes(action.payload) ? state : [...state, action.payload];
    case 'REMOVE':
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
}

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  useEffect(() => {
    if (!user) {
      dispatch({ type: 'SET', payload: [] });
      return;
    }

    let isMounted = true;

    async function fetchFavorites() {
      const { data, error } = await supabase
        .from('favorites')
        .select('product_id');

      if (!error && data && isMounted) {
        const ids = data.map((item: { product_id: number }) => item.product_id);
        dispatch({ type: 'SET', payload: ids });
      }
    }

    fetchFavorites();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const isFavorite = (id: number): boolean => {
    return favorites.includes(id);
  };

  const toggleFavorite = async (id: number): Promise<void> => {
    if (!user) {
      router.push('/login');
      return;
    }

    const favorited = favorites.includes(id);

    if (favorited) {
      // Optimistic update
      dispatch({ type: 'REMOVE', payload: id });
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', id);

      if (error) {
        // Rollback
        dispatch({ type: 'ADD', payload: id });
        console.error('Failed to remove favorite:', error.message);
      }
    } else {
      // Optimistic update
      dispatch({ type: 'ADD', payload: id });
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, product_id: id });

      if (error) {
        // Rollback
        dispatch({ type: 'REMOVE', payload: id });
        console.error('Failed to add favorite:', error.message);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
