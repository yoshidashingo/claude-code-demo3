# 初回実装 - 設計

## 1. 実装アプローチ

React 18 + TypeScript + Vite + Tailwind CSS + React Router の構成でSPAを構築する。
状態管理は React Context API を使用し、モックデータでフロントエンドのみ完結させる。

## 2. 環境構成

### 2.1 Viteプロジェクト初期化

```bash
npm create vite@latest . -- --template react-ts
```

### 2.2 追加パッケージ

```bash
npm install react-router-dom
npm install -D tailwindcss @tailwindcss/vite
```

## 3. 実装するファイル一覧

### 3.1 型定義・データ

| ファイル | 内容 |
|----------|------|
| `src/types/index.ts` | Product, CartItem, Category 型定義 |
| `src/data/products.ts` | モック商品データ（10〜15件） |
| `src/constants/categories.ts` | カテゴリ定数定義 |
| `src/utils/format.ts` | 価格フォーマット関数 |

### 3.2 Context

| ファイル | 内容 |
|----------|------|
| `src/contexts/CartContext.tsx` | カート状態管理（追加・削除・数量変更・合計計算） |
| `src/contexts/FavoritesContext.tsx` | お気に入り状態管理（トグル・判定・件数） |

### 3.3 レイアウトコンポーネント

| ファイル | 内容 |
|----------|------|
| `src/components/layout/Header.tsx` | ロゴ、ナビリンク（カート・お気に入りバッジ付き） |
| `src/components/layout/Footer.tsx` | コピーライト |

### 3.4 商品コンポーネント

| ファイル | 内容 |
|----------|------|
| `src/components/product/CategoryFilter.tsx` | カテゴリ選択タブ |
| `src/components/product/ProductCard.tsx` | 商品カード（画像・名前・価格・お気に入り） |
| `src/components/product/ProductList.tsx` | 商品カードのグリッド表示 |
| `src/components/product/ProductDetail.tsx` | 商品詳細情報 |

### 3.5 カートコンポーネント

| ファイル | 内容 |
|----------|------|
| `src/components/cart/CartItem.tsx` | カート内個別商品（画像・名前・数量変更・削除） |
| `src/components/cart/CartItemList.tsx` | カート内商品リスト |
| `src/components/cart/CartSummary.tsx` | 合計金額表示 |

### 3.6 お気に入りコンポーネント

| ファイル | 内容 |
|----------|------|
| `src/components/favorites/FavoriteList.tsx` | お気に入り商品一覧（ProductCard再利用） |

### 3.7 ページコンポーネント

| ファイル | 内容 |
|----------|------|
| `src/pages/HomePage.tsx` | 商品一覧 + カテゴリフィルター |
| `src/pages/ProductDetailPage.tsx` | URLパラメータで商品取得、詳細表示 |
| `src/pages/CartPage.tsx` | カート一覧 + 合計 |
| `src/pages/FavoritesPage.tsx` | お気に入り一覧 |

### 3.8 アプリケーション

| ファイル | 内容 |
|----------|------|
| `src/App.tsx` | ルーティング設定、Provider配置、レイアウト |
| `src/main.tsx` | ReactDOMレンダリング |
| `src/index.css` | Tailwind CSSインポート |
| `index.html` | HTMLテンプレート |

## 4. データ構造

### 4.1 モック商品データ（例）

```typescript
const products: Product[] = [
  {
    id: '1',
    name: '京都宇治抹茶大福',
    description: '厳選された宇治抹茶を使用した...',
    price: 1200,
    image: '/images/matcha-daifuku.jpg',
    category: 'wagashi',
    stock: 15,
  },
  // ... 10〜15件
];
```

※ 画像は `https://placehold.co/400x300` 等のプレースホルダーを使用

### 4.2 カテゴリ定数

```typescript
const CATEGORIES: CategoryLabel[] = [
  { value: 'all', label: '全て' },
  { value: 'wagashi', label: '和菓子' },
  { value: 'yogashi', label: '洋菓子' },
  { value: 'seasoning', label: '調味料' },
  { value: 'beverage', label: '飲料' },
  { value: 'processed', label: '加工食品' },
];
```

## 5. ルーティング設計

```typescript
<BrowserRouter>
  <CartProvider>
    <FavoritesProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
      <Footer />
    </FavoritesProvider>
  </CartProvider>
</BrowserRouter>
```

## 6. スタイリング

- Tailwind CSS をベースにユーティリティクラスで構築
- プライマリカラー: `amber-600` / `amber-700`
- 背景: `gray-50`
- テキスト: `gray-800` / `gray-500`
- お気に入りアイコン: `red-500`（活性時）
- レスポンシブ: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
