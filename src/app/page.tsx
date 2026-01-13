'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import products from '@/data/products.json';
import { Product } from '@/types';

export default function HomePage() {
  const featuredProducts = (products as Product[]).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[var(--primary)] to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              あなたのスタイルを<br />見つけよう
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              厳選されたファッションアイテムで、<br />
              毎日をもっと素敵に。
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary">
                商品を見る
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Features */}
      <section className="py-16 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">送料無料</h3>
              <p className="text-sm text-[var(--muted)]">10,000円以上のお買い上げで送料無料</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">30日間返品無料</h3>
              <p className="text-sm text-[var(--muted)]">サイズが合わなくても安心の返品保証</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">安心のセキュリティ</h3>
              <p className="text-sm text-[var(--muted)]">SSL暗号化で安全にお買い物</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">人気の商品</h2>
            <Link href="/products" className="text-[var(--primary)] hover:underline">
              すべて見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            新規会員登録で10%OFF
          </h2>
          <p className="text-[var(--muted)] mb-8">
            今すぐ会員登録して、初回購入を10%オフでお楽しみください。
          </p>
          <Link href="/auth/signup">
            <Button size="lg">
              会員登録する
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
