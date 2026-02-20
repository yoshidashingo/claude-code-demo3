import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useFavorites } from '../contexts/FavoritesContext';
import FavoriteList from '../components/favorites/FavoriteList';

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();

  const favoriteProducts = useMemo(
    () => products.filter((p) => favoriteIds.includes(p.id)),
    [favoriteIds]
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">お気に入り</h1>
      {favoriteProducts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">お気に入りの商品はまだありません。</p>
          <Link
            to="/"
            className="mt-4 inline-block text-amber-600 hover:text-amber-700 transition-colors"
          >
            ← 商品を探す
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <FavoriteList products={favoriteProducts} />
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
