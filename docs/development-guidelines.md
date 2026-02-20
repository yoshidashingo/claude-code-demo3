# 開発ガイドライン

## 1. TypeScript規約

### 1.1 基本ルール
- `strict` モードを有効にする
- `any` 型の使用を禁止する
- 明示的な型注釈を推奨（型推論が十分な場合は省略可）

### 1.2 型定義
- 共通の型は `src/types/index.ts` で定義
- コンポーネントのPropsは `interface` で定義し、`Props` サフィックスを付ける

```typescript
interface ProductCardProps {
  product: Product;
}
```

## 2. React規約

### 2.1 コンポーネント
- 関数コンポーネントのみ使用（クラスコンポーネントは使用しない）
- `React.FC` は使用しない（Props型を引数に直接指定）

```typescript
// Good
const ProductCard = ({ product }: ProductCardProps) => {
  return <div>{product.name}</div>;
};

// Bad
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return <div>{product.name}</div>;
};
```

### 2.2 フック
- フックの呼び出しはコンポーネントのトップレベルで行う
- カスタムフックは `use` 接頭辞を付ける

### 2.3 イベントハンドラ
- `handle` 接頭辞を使用する

```typescript
const handleClick = () => { ... };
const handleSubmit = (e: React.FormEvent) => { ... };
```

## 3. 命名規則

### 3.1 変数・関数

| 対象 | 規則 | 例 |
|------|------|-----|
| 変数 | camelCase | `cartItems`, `totalPrice` |
| 関数 | camelCase | `addToCart`, `formatPrice` |
| 定数 | UPPER_SNAKE_CASE | `MAX_QUANTITY`, `DEFAULT_CATEGORY` |
| コンポーネント | PascalCase | `ProductCard`, `CartSummary` |
| 型/Interface | PascalCase | `Product`, `CartItem` |
| Context | PascalCase | `CartContext`, `FavoritesContext` |

### 3.2 CSSクラス
- Tailwind CSSのユーティリティクラスを使用
- カスタムクラスが必要な場合はケバブケース

## 4. スタイリング規約

### 4.1 Tailwind CSS クラスの順序

1. レイアウト（`flex`, `grid`, `block`）
2. 位置（`relative`, `absolute`）
3. サイズ（`w-`, `h-`, `max-w-`）
4. 余白（`m-`, `p-`）
5. 背景（`bg-`）
6. ボーダー（`border-`, `rounded-`）
7. テキスト（`text-`, `font-`）
8. その他

### 4.2 レスポンシブ

```typescript
// モバイルファーストで記述
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

## 5. Git規約

### 5.1 ブランチ命名

```
[YYYYMMDD]-[開発タイトル]
```

例: `20260219-initial-implementation`

### 5.2 コミットメッセージ

```
<type>: <subject>

<body>（任意）
```

**type:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: フォーマット変更（機能に影響なし）
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: ビルドプロセスやツールの変更

### 5.3 コミット単位
- 論理的に意味のある単位でコミット
- 1コミットに複数の無関係な変更を含めない

## 6. コード品質チェック

### 6.1 開発完了時の必須チェック

```bash
npm run lint          # ESLintチェック
npx tsc --noEmit      # TypeScript型チェック
npm run build         # ビルド確認
```

### 6.2 チェックリスト
- [ ] ESLintエラーがゼロ
- [ ] TypeScript型エラーがゼロ
- [ ] ビルドが成功する
- [ ] レスポンシブ表示が正しい
- [ ] 全画面の遷移が正常
