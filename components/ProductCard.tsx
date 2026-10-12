import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Product } from '@/data/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      data-testid="product-card"
      className="relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border bg-card"
    >
      <div className="absolute top-3 right-3 z-20">
        <FavoriteButton productId={product.id} />
      </div>

      <Link
        href={`/products/${product.id}`}
        data-testid="link-detail"
        className="flex flex-col flex-1"
      >
        <div className="relative w-full pt-[100%] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-testid="product-image"
          />
        </div>
        <CardHeader>
          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">
            {product.category}
          </div>
          <CardTitle
            data-testid="product-name"
            className="text-xl group-hover:text-primary transition-colors line-clamp-1"
          >
            {product.name}
          </CardTitle>
          <CardDescription
            data-testid="product-description"
            className="line-clamp-2 mt-2"
          >
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto pt-0">
          <div className="flex items-center justify-between">
            <p
              data-testid="product-price"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
            >
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
