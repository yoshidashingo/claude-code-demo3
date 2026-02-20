import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/format';
import { useFavorites } from '../../contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white"
          aria-label={favorited ? 'お気に入りから解除' : 'お気に入りに追加'}
        >
          <span className={`text-lg ${favorited ? 'text-red-500' : 'text-gray-400'}`}>
            {favorited ? '♥' : '♡'}
          </span>
        </button>
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded bg-white px-3 py-1 text-sm font-bold text-gray-800">
              在庫切れ
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-bold text-amber-700">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
