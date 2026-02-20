import { useState, useMemo } from 'react';
import { products } from '../data/products';
import type { CategoryFilter as CategoryFilterType } from '../types';
import CategoryFilter from '../components/product/CategoryFilter';
import ProductList from '../components/product/ProductList';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>('all');

  const filteredProducts = useMemo(
    () =>
      selectedCategory === 'all'
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">商品一覧</h1>
      <div className="mt-4">
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>
      <div className="mt-6">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default HomePage;
