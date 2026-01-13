export function Footer() {
  return (
    <footer className="bg-[var(--secondary)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--primary)]">EC Shop</h3>
            <p className="text-[var(--muted)] text-sm">
              高品質なファッションアイテムを<br />
              お手頃価格でお届けします。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">クイックリンク</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  商品一覧
                </a>
              </li>
              <li>
                <a href="/about" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  会社概要
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">サポート</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  よくある質問
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  配送について
                </a>
              </li>
              <li>
                <a href="/returns" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  返品・交換
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-sm text-[var(--muted)]">
          <p>&copy; 2024 EC Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
