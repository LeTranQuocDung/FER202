import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Header } from '@/components/Header';
import { FavoriteButton } from '@/components/FavoriteButton';
import { products } from '@/data/products';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  const product = products.find((p) => p.id === numId);

  if (isNaN(numId) || !product) {
    notFound();
  }

  return {
    title: `${product.name} | Lumina`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const numId = Number(id);

  if (isNaN(numId)) {
    notFound();
  }

  const product = products.find((p) => p.id === numId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <Link
            href="/"
            data-testid="link-back"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Products</span>
          </Link>
        </div>

        <div
          data-testid="product-detail"
          className="bg-card border rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          {/* Product Image Section */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted border">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col space-y-6">
            <div>
              <div className="inline-block mb-3">
                <span
                  data-testid="detail-category"
                  className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20"
                >
                  {product.category}
                </span>
              </div>
              <h1
                data-testid="detail-name"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              >
                {product.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span
                data-testid="detail-price"
                className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
              >
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">USD (Taxes included)</span>
            </div>

            <div className="border-t border-b py-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Description
              </h3>
              <p
                data-testid="detail-description"
                className="text-base text-muted-foreground leading-relaxed"
              >
                {product.description}
              </p>
            </div>

            {/* Favorite & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center">
                <FavoriteButton productId={product.id} showText={true} className="w-full sm:w-auto px-6 py-3 border shadow-sm" />
              </div>
            </div>

            {/* Value Propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <span>Free express shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>2-year warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-primary" />
                <span>30-day hassle-free return</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
