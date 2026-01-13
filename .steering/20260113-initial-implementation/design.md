# 初回実装 - 設計

## 実装アプローチ

### 技術スタック
- React 18 + TypeScript
- Vite（ビルドツール）
- Tailwind CSS（スタイリング）
- React Router v6（ルーティング）
- React Context API（状態管理）

## 変更するコンポーネント

### 新規作成

#### 型定義
- `src/types/index.ts` - Product, CartItem型

#### データ
- `src/data/products.ts` - 商品モックデータ

#### Context
- `src/contexts/CartContext.tsx` - カート状態管理
- `src/contexts/FavoritesContext.tsx` - お気に入り状態管理

#### コンポーネント
- `src/components/layout/Header.tsx` - ヘッダー
- `src/components/layout/Footer.tsx` - フッター
- `src/components/product/ProductCard.tsx` - 商品カード
- `src/components/product/ProductList.tsx` - 商品一覧
- `src/components/product/ProductDetail.tsx` - 商品詳細
- `src/components/cart/Cart.tsx` - カート
- `src/components/cart/CartItem.tsx` - カート項目
- `src/components/favorites/Favorites.tsx` - お気に入り

#### ページ
- `src/pages/HomePage.tsx` - トップページ
- `src/pages/ProductPage.tsx` - 商品詳細ページ
- `src/pages/CartPage.tsx` - カートページ
- `src/pages/FavoritesPage.tsx` - お気に入りページ

## データ構造

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  stock: number;
}

type Category = 'wagashi' | 'yogashi' | 'seasoning' | 'beverage' | 'processed';

interface CartItem {
  product: Product;
  quantity: number;
}
```

## ルーティング

| パス | コンポーネント |
|------|----------------|
| / | HomePage |
| /products/:id | ProductPage |
| /cart | CartPage |
| /favorites | FavoritesPage |

## スタイリング方針

- Tailwind CSSを使用
- モバイルファースト
- カラーパレット:
  - Primary: amber-600（食品に合う暖色）
  - Background: gray-50
  - Text: gray-800
