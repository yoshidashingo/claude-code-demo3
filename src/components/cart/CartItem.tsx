import type { CartItem as CartItemType } from '../../types';
import { formatPrice } from '../../utils/format';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-20 w-20 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-amber-700 font-bold">{formatPrice(product.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
          aria-label="数量を減らす"
        >
          −
        </button>
        <span className="w-8 text-center font-medium">{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          disabled={quantity >= product.stock}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="数量を増やす"
        >
          +
        </button>
      </div>
      <p className="w-24 text-right font-bold text-gray-800">
        {formatPrice(product.price * quantity)}
      </p>
      <button
        onClick={() => removeFromCart(product.id)}
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label="カートから削除"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
