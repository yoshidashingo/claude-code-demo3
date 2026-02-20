import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';

const Header = () => {
  const { totalCount } = useCart();
  const { favoritesCount } = useFavorites();

  return (
    <header className="bg-amber-600 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          おいしいマルシェ
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/favorites" className="relative hover:text-amber-200 transition-colors">
            お気に入り
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                {favoritesCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative hover:text-amber-200 transition-colors">
            カート
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                {totalCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
