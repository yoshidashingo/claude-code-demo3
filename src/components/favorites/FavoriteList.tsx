import type { Product } from '../../types';
import ProductCard from '../product/ProductCard';

interface FavoriteListProps {
  products: Product[];
}

const FavoriteList = ({ products }: FavoriteListProps) => {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        お気に入りの商品はまだありません。
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FavoriteList;
