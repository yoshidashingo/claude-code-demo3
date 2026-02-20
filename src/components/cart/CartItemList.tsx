import type { CartItem as CartItemType } from '../../types';
import CartItem from './CartItem';

interface CartItemListProps {
  items: CartItemType[];
}

const CartItemList = ({ items }: CartItemListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))}
    </div>
  );
};

export default CartItemList;
