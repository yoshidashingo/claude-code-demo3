# リポジトリ構造定義書

## ディレクトリ構造

```
claude-code-demo3/
├── CLAUDE.md                           # 開発標準ルール
├── README.md                           # プロジェクト説明
├── docs/                               # 永続的ドキュメント
│   ├── product-requirements.md         # プロダクト要求定義書
│   ├── functional-design.md            # 機能設計書
│   ├── architecture.md                 # 技術仕様書
│   ├── repository-structure.md         # 本ファイル
│   ├── development-guidelines.md       # 開発ガイドライン
│   └── glossary.md                     # ユビキタス言語定義
├── .steering/                          # 作業単位のステアリングファイル
│   └── [YYYYMMDD]-[開発タイトル]/
├── src/                                # ソースコード
│   ├── components/                     # Reactコンポーネント
│   │   ├── layout/                     # レイアウト系
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── product/                    # 商品系
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductList.tsx
│   │   │   └── ProductDetail.tsx
│   │   ├── cart/                       # カート系
│   │   │   ├── Cart.tsx
│   │   │   └── CartItem.tsx
│   │   └── favorites/                  # お気に入り系
│   │       └── Favorites.tsx
│   ├── contexts/                       # Context API
│   │   ├── CartContext.tsx
│   │   └── FavoritesContext.tsx
│   ├── hooks/                          # カスタムフック
│   │   ├── useCart.ts
│   │   └── useFavorites.ts
│   ├── types/                          # TypeScript型定義
│   │   └── index.ts
│   ├── data/                           # モックデータ
│   │   └── products.ts
│   ├── pages/                          # ページコンポーネント
│   │   ├── HomePage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── CartPage.tsx
│   │   └── FavoritesPage.tsx
│   ├── utils/                          # ユーティリティ関数
│   ├── constants/                      # 定数定義
│   ├── App.tsx                         # メインコンポーネント
│   ├── main.tsx                        # エントリーポイント
│   └── index.css                       # グローバルスタイル
├── public/                             # 静的ファイル
├── index.html                          # HTMLテンプレート
├── package.json                        # 依存関係
├── tsconfig.json                       # TypeScript設定
├── vite.config.ts                      # Vite設定
├── tailwind.config.js                  # Tailwind CSS設定
├── postcss.config.js                   # PostCSS設定
└── eslint.config.js                    # ESLint設定
```

## ディレクトリの役割

### src/components/
再利用可能なUIコンポーネントを配置。機能ごとにサブディレクトリを作成。

### src/contexts/
グローバル状態管理用のReact Contextを配置。

### src/hooks/
カスタムフックを配置。Contextのラッパーや共通ロジックを抽出。

### src/types/
TypeScriptの型定義を配置。共通で使用する型をまとめる。

### src/data/
モックデータや定数データを配置。

### src/pages/
ルーティングに対応するページコンポーネントを配置。

## ファイル命名規則

| 種類 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | ProductCard.tsx |
| フック | camelCase（use接頭辞） | useCart.ts |
| Context | PascalCase（Context接尾辞） | CartContext.tsx |
| 型定義 | PascalCase | Product, CartItem |
| 定数 | UPPER_SNAKE_CASE | MAX_QUANTITY |
