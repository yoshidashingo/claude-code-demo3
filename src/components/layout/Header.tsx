'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--background)] border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-[var(--primary)]">
            EC Shop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              商品一覧
            </Link>
            {user ? (
              <>
                <Link href="/orders" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                  注文履歴
                </Link>
                <Link href="/profile" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                  プロフィール
                </Link>
                <button
                  onClick={logout}
                  className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                ログイン
              </Link>
            )}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-3">
              <Link
                href="/products"
                className="px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                商品一覧
              </Link>
              {user ? (
                <>
                  <Link
                    href="/orders"
                    className="px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    注文履歴
                  </Link>
                  <Link
                    href="/profile"
                    className="px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    プロフィール
                  </Link>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="px-4 py-2 text-left rounded-lg hover:bg-[var(--secondary)] text-[var(--muted)] transition-colors"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ログイン
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
