import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Search } from 'lucide-react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q.trim() : '';
  const category = typeof resolvedSearchParams?.category === 'string' ? resolvedSearchParams.category.trim() : '';

  const categories = Array.from(new Set(products.map((p) => p.category)));

  let filteredProducts = products;

  if (q) {
    const lowerQ = q.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQ) ||
        product.description.toLowerCase().includes(lowerQ)
    );
  }

  if (category) {
    const lowerCat = category.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === lowerCat
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-16 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 flex-1">
        {/* Hero Section */}
        <div className="py-12 md:py-20 flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-primary/20 bg-primary/5 text-primary shadow-sm">
            ✨ Handcrafted & Curated Collection
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Elevate your everyday with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">Lumina</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Explore our timeless essentials designed for uncompromising style, durability, and elegance.
          </p>
        </div>

        {/* Filter & Search Form (URL driven) */}
        <div className="max-w-3xl mx-auto mb-10">
          <form
            method="get"
            action="/"
            className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl border shadow-sm"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search products by name or description..."
                data-testid="search-input"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
              />
            </div>

            <div className="sm:w-48">
              <select
                name="category"
                defaultValue={category}
                data-testid="category-select"
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all cursor-pointer"
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              data-testid="btn-search"
              className="px-6 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-primary to-purple-600 text-white shadow hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Search
            </button>
          </form>

          {(q || category) && (
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 px-1">
              <span>
                Showing results for {q ? `"${q}"` : ''} {category ? `in ${category}` : ''} ({filteredProducts.length} items)
              </span>
              <a href="/" className="text-primary hover:underline font-medium">
                Reset filters
              </a>
            </div>
          )}
        </div>

        {/* Product Grid / Empty State */}
        {filteredProducts.length === 0 ? (
          <div
            data-testid="no-results"
            className="text-center py-20 px-4 rounded-3xl border border-dashed bg-muted/20 my-6 max-w-xl mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 text-muted-foreground text-xl">
              🔍
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No matching products found
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              We couldn't find anything matching your search criteria. Try different keywords or select another category.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              View All Products
            </a>
          </div>
        ) : (
          <div
            data-testid="product-list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
