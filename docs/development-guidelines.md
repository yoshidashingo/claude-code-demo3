# 開発ガイドライン

## 1. コーディング規約

### 1.1 TypeScript
- `strict` モードを有効にする
- `any` 型の使用を避ける
- 明示的な型注釈を推奨

```typescript
// Good
const addToCart = (product: Product, quantity: number): void => {
  // ...
};

// Avoid
const addToCart = (product: any, quantity) => {
  // ...
};
```

### 1.2 React
- 関数コンポーネントを使用
- Propsにはインターフェースを定義
- 副作用はuseEffectで管理

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    // ...
  );
};
```

## 2. 命名規則

### 2.1 変数・関数
- camelCaseを使用
- 動詞から始める（関数の場合）

```typescript
const productName = 'りんごジャム';
const handleClick = () => {};
const isLoading = true;
```

### 2.2 コンポーネント
- PascalCaseを使用
- 名詞または名詞句

```typescript
export const ProductCard = () => {};
export const ShoppingCart = () => {};
```

### 2.3 定数
- UPPER_SNAKE_CASEを使用

```typescript
const MAX_QUANTITY = 99;
const API_BASE_URL = '/api';
```

## 3. スタイリング規約（Tailwind CSS）

### 3.1 クラスの順序
1. レイアウト（display, position）
2. ボックスモデル（width, height, padding, margin）
3. タイポグラフィ（font, text）
4. ビジュアル（background, border, shadow）
5. その他（transition, animation）

```tsx
<div className="flex items-center w-full p-4 text-lg font-bold bg-white border rounded-lg shadow-md transition-all">
```

### 3.2 レスポンシブ対応
- モバイルファーストで記述
- ブレークポイント: sm(640px), md(768px), lg(1024px)

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
```

## 4. Git規約

### 4.1 ブランチ命名
- `feature/` - 新機能
- `fix/` - バグ修正
- `refactor/` - リファクタリング

### 4.2 コミットメッセージ
```
<type>: <subject>

<body>
```

**type:**
- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: フォーマット
- refactor: リファクタリング
- test: テスト
- chore: その他

## 5. ファイル構成

### 5.1 コンポーネントファイル
```typescript
// 1. インポート
import { useState } from 'react';
import { Product } from '../types';

// 2. 型定義
interface Props {
  product: Product;
}

// 3. コンポーネント本体
export const ProductCard: React.FC<Props> = ({ product }) => {
  // state
  const [isHovered, setIsHovered] = useState(false);

  // handlers
  const handleClick = () => {};

  // render
  return (
    <div>...</div>
  );
};
```

## 6. 品質チェック

### 6.1 開発完了時
```bash
npm run lint          # ESLintチェック
npx tsc --noEmit      # 型チェック
npm run build         # ビルド確認
```

### 6.2 コードレビュー観点
- 型安全性
- コンポーネントの責務分離
- パフォーマンス（不要な再レンダリング）
- アクセシビリティ
