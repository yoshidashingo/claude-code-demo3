'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 p-4 bg-[var(--card)] rounded-lg border">
      <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-[var(--secondary)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-[var(--foreground)] line-clamp-1">{product.name}</h3>
        <p className="text-sm text-[var(--muted)] mt-1">{formatPrice(product.price)}</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="px-3 py-1 hover:bg-[var(--secondary)] transition-colors"
            >
              -
            </button>
            <span className="px-3 py-1 border-x">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="px-3 py-1 hover:bg-[var(--secondary)] transition-colors"
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(product.id)}
            className="text-[var(--error)] text-sm hover:underline"
          >
            削除
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-[var(--primary)]">
          {formatPrice(product.price * quantity)}
        </p>
      </div>
    </div>
  );
}
