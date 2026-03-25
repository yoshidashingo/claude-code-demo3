# リポジトリ構造定義書

## フォルダ・ファイル構成

```
claude-code-demo3/
├── CLAUDE.md                         # 開発標準ルール
├── README.md                         # プロジェクト説明
├── docs/                             # 永続的ドキュメント
│   ├── product-requirements.md       # プロダクト要求定義書
│   ├── functional-design.md          # 機能設計書
│   ├── architecture.md               # 技術仕様書
│   ├── repository-structure.md       # リポジトリ構造定義書
│   ├── development-guidelines.md     # 開発ガイドライン
│   └── glossary.md                   # ユビキタス言語定義
├── .steering/                        # 作業単位のステアリングファイル
│   └── [YYYYMMDD]-[開発タイトル]/
│       ├── requirements.md           # 今回の作業の要求内容
│       ├── design.md                 # 変更内容の設計
│       └── tasklist.md               # タスクリスト
├── src/                              # ソースコード
│   ├── components/                   # Reactコンポーネント
│   │   ├── Header.tsx                # ヘッダー
│   │   ├── TaskInput.tsx             # タスク入力フォーム
│   │   ├── TaskFilter.tsx            # フィルターボタン
│   │   ├── TaskList.tsx              # タスク一覧
│   │   ├── TaskItem.tsx              # 個別タスク
│   │   └── TaskFooter.tsx            # フッター
│   ├── contexts/                     # Context API
│   │   └── TaskContext.tsx            # タスク状態管理
│   ├── hooks/                        # カスタムフック
│   │   └── useLocalStorage.ts        # localStorage フック
│   ├── types/                        # TypeScript型定義
│   │   └── task.ts                   # タスク関連の型
│   ├── App.tsx                       # メインコンポーネント
│   └── main.tsx                      # エントリーポイント
├── public/                           # 静的ファイル
├── index.html                        # HTMLテンプレート
├── package.json                      # 依存関係
├── tsconfig.json                     # TypeScript設定
├── tsconfig.app.json                 # アプリ用TypeScript設定
├── tsconfig.node.json                # Node用TypeScript設定
├── vite.config.ts                    # Vite設定
└── eslint.config.js                  # ESLint設定
```

## ディレクトリの役割

| ディレクトリ | 役割 |
|-------------|------|
| `docs/` | プロジェクト全体の設計ドキュメント |
| `.steering/` | 作業単位の計画・設計ドキュメント |
| `src/components/` | UIコンポーネント |
| `src/contexts/` | React Context（状態管理） |
| `src/hooks/` | カスタムフック |
| `src/types/` | TypeScript型定義 |
| `public/` | 静的アセット |

## ファイル配置ルール

1. **コンポーネント**: `src/components/` に1ファイル1コンポーネントで配置
2. **Context**: `src/contexts/` にドメインごとに配置
3. **カスタムフック**: `src/hooks/` に `use` プレフィックスで配置
4. **型定義**: `src/types/` にドメインごとに配置
5. **ユーティリティ**: `src/utils/` に機能ごとに配置（必要に応じて作成）
6. **定数**: `src/constants/` に配置（必要に応じて作成）
