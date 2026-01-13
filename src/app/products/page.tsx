'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import products from '@/data/products.json';
import { Product, Category } from '@/types';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">商品一覧</h1>
        <p className="text-[var(--muted)]">厳選されたファッションアイテムをお探しください</p>
      </div>
      <ProductGrid
        products={products as Product[]}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
}
