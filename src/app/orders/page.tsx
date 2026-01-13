'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const statusLabels = {
  pending: { label: '処理中', color: 'bg-yellow-500' },
  confirmed: { label: '確定', color: 'bg-blue-500' },
  shipped: { label: '発送済み', color: 'bg-purple-500' },
  delivered: { label: '配達完了', color: 'bg-green-500' },
};

function OrdersList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newOrderId = searchParams.get('new');
  const { user, orders, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login?redirect=/orders');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <p className="text-[var(--muted)] text-center py-16">読み込み中...</p>;
  }

  if (!user) {
    return null;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--muted)] mb-8">まだ注文がありません</p>
        <Link href="/products">
          <Button size="lg">商品を見る</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {newOrderId && (
        <div className="bg-[var(--success)]/10 border border-[var(--success)] rounded-lg p-4 mb-8">
          <p className="text-[var(--success)] font-medium">
            ご注文ありがとうございます! 注文が確定しました。
          </p>
        </div>
      )}

      <div className="space-y-6">
        {orders.map(order => {
          const status = statusLabels[order.status];
          return (
            <div
              key={order.id}
              className={`bg-[var(--card)] rounded-2xl border p-6 ${
                order.id === newOrderId ? 'ring-2 ring-[var(--success)]' : ''
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-[var(--muted)]">注文番号</p>
                  <p className="font-mono">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--muted)]">注文日</p>
                  <p>{new Date(order.createdAt).toLocaleDateString('ja-JP')}</p>
                </div>
                <div>
                  <span className={`${status.color} text-white text-sm px-3 py-1 rounded-full`}>
                    {status.label}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                {order.items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-[var(--secondary)] flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-sm text-[var(--muted)]">
                        {formatPrice(item.product.price)} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                <div className="text-sm text-[var(--muted)]">
                  配送先: {order.shippingAddress.prefecture} {order.shippingAddress.city}
                </div>
                <div className="text-right">
                  <p className="text-sm text-[var(--muted)]">合計</p>
                  <p className="text-xl font-bold text-[var(--primary)]">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">注文履歴</h1>
      <Suspense fallback={<p className="text-[var(--muted)] text-center py-16">読み込み中...</p>}>
        <OrdersList />
      </Suspense>
    </div>
  );
}
