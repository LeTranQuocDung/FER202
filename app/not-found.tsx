import Link from 'next/link';
import { Header } from '@/components/Header';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <Header />
      <main
        data-testid="not-found"
        className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center py-20"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          404 - Page Not Found
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Sorry, we couldn&apos;t find the product or page you are looking for. It may have been removed or the link is incorrect.
        </p>
        <Link
          href="/"
          data-testid="link-back"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </main>
    </div>
  );
}
