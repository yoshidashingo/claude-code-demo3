'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export function CartSummary() {
  const { total, itemCount } = useCart();
  const { user } = useAuth();

  const shippingFee = total >= 10000 ? 0 : 500;
  const grandTotal = total + shippingFee;

  return (
    <div className="bg-[var(--card)] rounded-lg border p-6 sticky top-24">
      <h2 className="text-lg font-bold mb-4">注文サマリー</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">商品小計 ({itemCount}点)</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">送料</span>
          <span>{shippingFee === 0 ? '無料' : formatPrice(shippingFee)}</span>
        </div>
        {total < 10000 && (
          <p className="text-xs text-[var(--accent)]">
            あと{formatPrice(10000 - total)}で送料無料!
          </p>
        )}
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>合計</span>
            <span className="text-[var(--primary)]">{formatPrice(grandTotal)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {user ? (
          <Link href="/checkout">
            <Button className="w-full" size="lg" disabled={itemCount === 0}>
              レジに進む
            </Button>
          </Link>
        ) : (
          <Link href="/auth/login?redirect=/checkout">
            <Button className="w-full" size="lg" disabled={itemCount === 0}>
              ログインしてレジに進む
            </Button>
          </Link>
        )}
      </div>

      <p className="text-xs text-[var(--muted)] text-center mt-4">
        安全な決済で保護されています
      </p>
    </div>
  );
}
