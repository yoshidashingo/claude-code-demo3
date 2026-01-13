'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Address } from '@/types';

export function CheckoutForm() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState<Address>({
    postalCode: '',
    prefecture: '',
    city: '',
    line1: '',
    line2: '',
  });

  const shippingFee = total >= 10000 ? 0 : 500;
  const grandTotal = total + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const order = addOrder({
      items: [...items],
      total: grandTotal,
      shippingAddress: address,
      status: 'confirmed',
    });

    clearCart();
    showToast('ご注文ありがとうございます!', 'success');
    router.push(`/orders?new=${order.id}`);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Address */}
      <div className="bg-[var(--card)] rounded-2xl border p-6">
        <h2 className="text-lg font-bold mb-6">配送先住所</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="郵便番号"
            value={address.postalCode}
            onChange={e => setAddress({ ...address, postalCode: e.target.value })}
            placeholder="123-4567"
            required
          />
          <Input
            label="都道府県"
            value={address.prefecture}
            onChange={e => setAddress({ ...address, prefecture: e.target.value })}
            placeholder="東京都"
            required
          />
          <Input
            label="市区町村"
            value={address.city}
            onChange={e => setAddress({ ...address, city: e.target.value })}
            placeholder="渋谷区"
            required
            className="md:col-span-2"
          />
          <Input
            label="番地・建物名"
            value={address.line1}
            onChange={e => setAddress({ ...address, line1: e.target.value })}
            placeholder="1-2-3 サンプルビル 101"
            required
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-[var(--card)] rounded-2xl border p-6">
        <h2 className="text-lg font-bold mb-6">注文内容</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted)]">小計</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted)]">送料</span>
              <span>{shippingFee === 0 ? '無料' : formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>合計</span>
              <span className="text-[var(--primary)]">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment (Demo) */}
      <div className="bg-[var(--card)] rounded-2xl border p-6">
        <h2 className="text-lg font-bold mb-6">お支払い方法</h2>
        <div className="flex items-center gap-3 p-4 bg-[var(--secondary)] rounded-lg">
          <input type="radio" id="card" name="payment" defaultChecked className="w-4 h-4" />
          <label htmlFor="card" className="flex-1">
            <span className="font-medium">クレジットカード（デモ）</span>
            <p className="text-sm text-[var(--muted)]">注文ボタンを押すと注文が確定します</p>
          </label>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
        注文を確定する
      </Button>
    </form>
  );
}
