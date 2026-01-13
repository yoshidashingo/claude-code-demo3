'use client';

import { Product, Category } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'clothing', label: '衣類' },
  { value: 'accessories', label: 'アクセサリー' },
  { value: 'shoes', label: 'シューズ' },
  { value: 'bags', label: 'バッグ' },
];

export function ProductGrid({ products, selectedCategory, onCategoryChange }: ProductGridProps) {
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.value
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--border)]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--muted)]">該当する商品がありません</p>
        </div>
      )}
    </div>
  );
}
