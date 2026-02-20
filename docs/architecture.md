# 技術仕様書

## 1. テクノロジースタック

### 1.1 フロントエンド

| カテゴリ | 技術 | バージョン | 用途 |
|----------|------|------------|------|
| UIライブラリ | React | 18.x | UIコンポーネント構築 |
| 言語 | TypeScript | 5.x | 型安全な開発 |
| ビルドツール | Vite | 5.x | 高速な開発サーバーとビルド |
| スタイリング | Tailwind CSS | 3.x | ユーティリティファーストCSS |
| ルーティング | React Router | 6.x | クライアントサイドルーティング |
| ユーティリティ | uuid | 最新 | 一意なID生成 |
| ユーティリティ | date-fns | 最新 | 日付フォーマット（将来利用） |

### 1.2 開発ツール

| カテゴリ | 技術 | 用途 |
|----------|------|------|
| リンター | ESLint | コード品質チェック |
| 型チェック | TypeScript Compiler | 型安全性の検証 |
| パッケージ管理 | npm | 依存関係管理 |
| バージョン管理 | Git | ソースコード管理 |

## 2. アーキテクチャパターン

### 2.1 コンポーネントパターン

**Presentational / Container パターン**を採用する。

- **Presentational コンポーネント:** UIの表示に専念。Propsを受け取り描画する
- **Container コンポーネント（ページ）:** データの取得・状態管理を担当

### 2.2 状態管理パターン

- **グローバル状態:** React Context API + useReducer
  - CartContext: カート状態
  - FavoritesContext: お気に入り状態
- **ローカル状態:** useState
  - カテゴリフィルターの選択状態
  - UIの表示/非表示状態

### 2.3 ディレクトリ構造

```
src/
├── components/          # 再利用可能なUIコンポーネント
│   ├── layout/          # レイアウト（Header, Footer）
│   ├── product/         # 商品関連（ProductCard, ProductList, ProductDetail）
│   ├── cart/            # カート関連（CartItem, CartItemList, CartSummary）
│   └── favorites/       # お気に入り関連（FavoriteList）
├── contexts/            # Context API
│   ├── CartContext.tsx
│   └── FavoritesContext.tsx
├── data/                # モックデータ
│   └── products.ts
├── hooks/               # カスタムフック（必要に応じて）
├── pages/               # ページコンポーネント
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   └── FavoritesPage.tsx
├── types/               # TypeScript型定義
│   └── index.ts
├── utils/               # ユーティリティ関数
│   └── format.ts        # 価格フォーマットなど
├── constants/           # 定数定義
│   └── categories.ts
├── App.tsx              # メインコンポーネント（ルーティング設定）
└── main.tsx             # エントリーポイント
```

## 3. 技術的制約

### 3.1 フロントエンドのみ
- バックエンドAPIは使用しない
- データはモックデータとしてTypeScriptファイルに定義
- 状態はメモリ上で管理（ブラウザリロードでリセット）

### 3.2 ブラウザ対応
- Chrome、Firefox、Safari、Edgeの最新版
- ES2020以降の構文を使用

## 4. パフォーマンス要件

| 指標 | 目標値 |
|------|--------|
| 初回ページ読み込み | 3秒以内 |
| ページ遷移 | 即時（SPA） |
| UI操作レスポンス | 100ms以内 |
| バンドルサイズ | 500KB以内（gzip後） |

## 5. セキュリティ要件

- XSS対策: Reactのエスケープ機構を活用。dangerouslySetInnerHTMLは使用しない
- 入力バリデーション: 数量入力に対する最小値（1）・最大値（在庫数）のバリデーション
- 依存パッケージ: 既知の脆弱性がないことを確認
