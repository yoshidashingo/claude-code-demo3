'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    showToast(`${product.name}をカートに追加しました`, 'success');
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-[var(--card)] rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square relative overflow-hidden bg-[var(--secondary)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-[var(--accent)] text-white text-xs px-2 py-1 rounded">
            残りわずか
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-[var(--error)] text-white text-xs px-2 py-1 rounded">
            売り切れ
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[var(--accent)]' : 'text-[var(--border)]'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-[var(--muted)]">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-[var(--primary)]">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            カートに追加
          </Button>
        </div>
      </div>
    </Link>
  );
}
