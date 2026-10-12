import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('q')?.toLowerCase().trim();
  const category = searchParams.get('category')?.toLowerCase().trim();

  let filtered = products;

  if (q) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
    );
  }

  if (category) {
    filtered = filtered.filter(
      (product) => product.category.toLowerCase() === category
    );
  }

  return NextResponse.json(filtered, { status: 200 });
}
