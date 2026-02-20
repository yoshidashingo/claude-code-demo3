# リポジトリ構造定義書

## 1. ディレクトリ構造

```
claude-code-demo3/
├── CLAUDE.md                          # 開発標準ルール
├── README.md                          # プロジェクト説明
├── package.json                       # 依存関係・スクリプト定義
├── tsconfig.json                      # TypeScript設定
├── tsconfig.node.json                 # Vite用TypeScript設定
├── vite.config.ts                     # Vite設定
├── tailwind.config.js                 # Tailwind CSS設定
├── postcss.config.js                  # PostCSS設定
├── eslint.config.js                   # ESLint設定
├── index.html                         # HTMLエントリーポイント
├── docs/                              # 永続的ドキュメント
│   ├── product-requirements.md        # プロダクト要求定義書
│   ├── functional-design.md           # 機能設計書
│   ├── architecture.md                # 技術仕様書
│   ├── repository-structure.md        # 本ファイル
│   ├── development-guidelines.md      # 開発ガイドライン
│   └── glossary.md                    # ユビキタス言語定義
├── .steering/                         # 作業単位のステアリングファイル
│   └── [YYYYMMDD]-[開発タイトル]/
│       ├── requirements.md
│       ├── design.md
│       └── tasklist.md
├── public/                            # 静的ファイル
│   └── vite.svg                       # Viteロゴ
└── src/                               # ソースコード
    ├── main.tsx                        # エントリーポイント
    ├── App.tsx                         # メインコンポーネント
    ├── index.css                       # グローバルスタイル（Tailwind）
    ├── types/                          # TypeScript型定義
    │   └── index.ts
    ├── data/                           # モックデータ
    │   └── products.ts
    ├── constants/                      # 定数定義
    │   └── categories.ts
    ├── utils/                          # ユーティリティ関数
    │   └── format.ts
    ├── contexts/                       # Context API
    │   ├── CartContext.tsx
    │   └── FavoritesContext.tsx
    ├── hooks/                          # カスタムフック
    ├── components/                     # UIコンポーネント
    │   ├── layout/                     # レイアウト
    │   │   ├── Header.tsx
    │   │   └── Footer.tsx
    │   ├── product/                    # 商品関連
    │   │   ├── CategoryFilter.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductList.tsx
    │   │   └── ProductDetail.tsx
    │   ├── cart/                       # カート関連
    │   │   ├── CartItem.tsx
    │   │   ├── CartItemList.tsx
    │   │   └── CartSummary.tsx
    │   └── favorites/                  # お気に入り関連
    │       └── FavoriteList.tsx
    └── pages/                          # ページコンポーネント
        ├── HomePage.tsx
        ├── ProductDetailPage.tsx
        ├── CartPage.tsx
        └── FavoritesPage.tsx
```

## 2. 命名規則

### 2.1 ファイル命名

| 対象 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `ProductCard.tsx` |
| ページ | PascalCase + Page | `HomePage.tsx` |
| Context | PascalCase + Context | `CartContext.tsx` |
| カスタムフック | camelCase（use接頭辞） | `useCart.ts` |
| 型定義 | camelCase | `index.ts` |
| ユーティリティ | camelCase | `format.ts` |
| 定数 | camelCase | `categories.ts` |
| データ | camelCase | `products.ts` |

### 2.2 ディレクトリ命名

- すべて小文字のケバブケース（単語が1つの場合はそのまま）
- 役割が明確に分かる名前を使用

## 3. ファイル配置ルール

### 3.1 コンポーネント配置

- 再利用可能なコンポーネントは `src/components/` 配下に機能別サブディレクトリで管理
- ページコンポーネントは `src/pages/` に配置
- 1ファイル1コンポーネントを原則とする

### 3.2 型定義の配置

- 共通の型定義は `src/types/index.ts` に集約
- コンポーネント固有のProps型はコンポーネントファイル内で定義

### 3.3 データの配置

- モックデータは `src/data/` に配置
- 定数は `src/constants/` に配置
- ユーティリティ関数は `src/utils/` に配置
