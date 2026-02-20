import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItemList from '../components/cart/CartItemList';
import CartSummary from '../components/cart/CartSummary';

const CartPage = () => {
  const { items, totalCount, totalPrice } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">カート</h1>
      {items.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">カートに商品がありません。</p>
          <Link
            to="/"
            className="mt-4 inline-block text-amber-600 hover:text-amber-700 transition-colors"
          >
            ← 商品を探す
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartItemList items={items} />
          </div>
          <div>
            <CartSummary totalCount={totalCount} totalPrice={totalPrice} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
