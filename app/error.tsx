'use client';

import React from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      data-testid="error-boundary"
      className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
        <span className="text-2xl font-bold">!</span>
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Something went wrong!</h2>
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <button
        type="button"
        data-testid="btn-retry"
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
