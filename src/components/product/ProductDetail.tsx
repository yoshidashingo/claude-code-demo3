import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/format';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);
  const outOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (!outOfStock) {
      addToCart(product);
    }
  };

  return (
    <div>
      <Link
        to="/"
        className="mb-6 inline-flex items-center text-sm text-amber-600 hover:text-amber-700 transition-colors"
      >
        ← 商品一覧に戻る
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-amber-700">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            {product.description}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            在庫: {outOfStock ? '在庫切れ' : `${product.stock}点`}
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`flex-1 rounded-lg px-6 py-3 font-bold text-white transition-colors ${
                outOfStock
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              {outOfStock ? '在庫切れ' : 'カートに追加'}
            </button>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`rounded-lg border-2 px-4 py-3 font-bold transition-colors ${
                favorited
                  ? 'border-red-500 text-red-500 hover:bg-red-50'
                  : 'border-gray-300 text-gray-400 hover:border-red-500 hover:text-red-500'
              }`}
              aria-label={favorited ? 'お気に入りから解除' : 'お気に入りに追加'}
            >
              {favorited ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
