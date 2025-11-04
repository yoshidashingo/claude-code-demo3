# リポジトリ構造定義書 (Repository Structure Document)

## リポジトリ概要

本リポジトリは、開発者向けタスク管理CLIツール「Devtask」のソースコードを管理します。
Node.js + TypeScriptで実装され、npmパッケージとして公開されます。

## ディレクトリ構造

```
devtask/
├── .devtask/                       # Devtask自身のタスク管理
│   ├── config.json
│   └── tasks.json
├── .github/                        # GitHub設定
│   ├── workflows/                  # GitHub Actions
│   │   ├── ci.yml                 # CI/CDパイプライン
│   │   └── release.yml            # リリース自動化
│   └── ISSUE_TEMPLATE/            # Issueテンプレート
│       ├── bug_report.md
│       └── feature_request.md
├── .steering/                      # ステアリングファイル（作業単位のドキュメント）
│   └── 20250104-initial-implementation/
│       ├── requirements.md         # 初回実装の要求
│       ├── design.md              # 実装設計
│       └── tasklist.md            # 実装タスク
├── docs/                          # 永続的ドキュメント
│   ├── product-requirements.md    # プロダクト要求定義書
│   ├── functional-design.md       # 機能設計書
│   ├── architecture.md            # 技術仕様書
│   ├── repository-structure.md    # 本ファイル
│   ├── development-guidelines.md  # 開発ガイドライン
│   └── glossary.md                # ユビキタス言語定義
├── src/                           # ソースコード
│   ├── cli/                       # CLIレイヤー
│   │   ├── index.ts              # CLIエントリーポイント
│   │   ├── commands/             # コマンド定義
│   │   │   ├── add.ts            # タスク作成コマンド
│   │   │   ├── list.ts           # タスク一覧コマンド
│   │   │   ├── show.ts           # タスク詳細コマンド
│   │   │   ├── edit.ts           # タスク編集コマンド
│   │   │   ├── delete.ts         # タスク削除コマンド
│   │   │   ├── status.ts         # ステータス変更コマンド
│   │   │   ├── priority.ts       # 優先度変更コマンド
│   │   │   ├── stats.ts          # 統計情報コマンド
│   │   │   ├── init.ts           # プロジェクト初期化コマンド
│   │   │   └── index.ts          # コマンドエクスポート
│   │   └── ui/                   # UI表示
│   │       ├── table.ts          # テーブル表示ユーティリティ
│   │       ├── colors.ts         # カラー定義
│   │       ├── prompts.ts        # インタラクティブプロンプト
│   │       └── index.ts          # UIエクスポート
│   ├── services/                 # サービスレイヤー
│   │   ├── TaskManager.ts        # タスク管理ロジック
│   │   ├── PriorityEstimator.ts  # 優先度推定ロジック
│   │   ├── FileStorage.ts        # ファイル操作
│   │   └── index.ts              # サービスエクスポート
│   ├── types/                    # 型定義
│   │   ├── task.ts               # Task型、TaskStatus型、TaskPriority型
│   │   ├── config.ts             # Config型
│   │   ├── filter.ts             # FilterOptions型
│   │   ├── stats.ts              # TaskStats型
│   │   └── index.ts              # 型エクスポート
│   ├── utils/                    # ユーティリティ
│   │   ├── validation.ts         # バリデーション関数
│   │   ├── dateFormat.ts         # 日付フォーマット関数
│   │   ├── fileHelpers.ts        # ファイル操作ヘルパー
│   │   └── index.ts              # ユーティリティエクスポート
│   ├── constants/                # 定数定義
│   │   ├── taskStatus.ts         # ステータス定数
│   │   ├── taskPriority.ts       # 優先度定数
│   │   ├── paths.ts              # パス定数
│   │   ├── messages.ts           # メッセージ定数
│   │   └── index.ts              # 定数エクスポート
│   └── index.ts                  # パッケージエントリーポイント
├── tests/                        # テストコード
│   ├── unit/                     # 単体テスト
│   │   ├── services/
│   │   │   ├── TaskManager.test.ts
│   │   │   ├── PriorityEstimator.test.ts
│   │   │   └── FileStorage.test.ts
│   │   ├── utils/
│   │   │   ├── validation.test.ts
│   │   │   └── dateFormat.test.ts
│   │   └── constants/
│   │       └── taskStatus.test.ts
│   ├── integration/              # 統合テスト
│   │   └── cli/
│   │       ├── add.test.ts
│   │       ├── list.test.ts
│   │       └── edit.test.ts
│   ├── e2e/                      # E2Eテスト（将来的）
│   └── fixtures/                 # テストデータ
│       ├── tasks.json
│       └── config.json
├── dist/                         # ビルド成果物（Git管理外）
│   ├── cli/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── constants/
│   └── index.js
├── node_modules/                 # 依存パッケージ（Git管理外）
├── coverage/                     # テストカバレッジレポート（Git管理外）
├── .gitignore                    # Git除外設定
├── .npmignore                    # npm公開除外設定
├── package.json                  # パッケージ定義
├── package-lock.json             # 依存関係ロック
├── tsconfig.json                 # TypeScript設定
├── tsconfig.build.json           # ビルド用TypeScript設定
├── eslint.config.js              # ESLint設定
├── .prettierrc                   # Prettier設定
├── .prettierignore               # Prettier除外設定
├── vitest.config.ts              # Vitest設定
├── CHANGELOG.md                  # 変更履歴
├── LICENSE                       # ライセンス（MIT）
├── README.md                     # プロジェクト説明
└── CLAUDE.md                     # 開発標準ルール
```

## ディレクトリの役割

### ルートディレクトリ

#### `.devtask/`
- **役割**: Devtask自身のタスク管理
- **内容**: 開発タスクを管理
- **Git管理**: Yes
- **注意**: 本番環境では不要

#### `.github/`
- **役割**: GitHub関連の設定
- **内容**: GitHub Actions、Issueテンプレート
- **Git管理**: Yes

#### `.steering/`
- **役割**: 作業単位のステアリングファイル
- **内容**: 各開発作業の要求、設計、タスクリスト
- **Git管理**: Yes
- **命名規則**: `YYYYMMDD-開発タイトル`

#### `docs/`
- **役割**: 永続的ドキュメント
- **内容**: プロダクト要求、設計書、ガイドライン
- **Git管理**: Yes
- **更新頻度**: 低（基本設計変更時のみ）

#### `src/`
- **役割**: ソースコード
- **内容**: TypeScriptソースコード
- **Git管理**: Yes

#### `tests/`
- **役割**: テストコード
- **内容**: 単体テスト、統合テスト、E2Eテスト
- **Git管理**: Yes

#### `dist/`
- **役割**: ビルド成果物
- **内容**: JavaScriptコンパイル結果
- **Git管理**: No
- **生成**: `npm run build`

#### `node_modules/`
- **役割**: 依存パッケージ
- **Git管理**: No
- **生成**: `npm install`

#### `coverage/`
- **役割**: テストカバレッジレポート
- **Git管理**: No
- **生成**: `npm run test:coverage`

### ソースコードディレクトリ（`src/`）

#### `src/cli/`
- **役割**: CLIレイヤー
- **責任**: ユーザー入力の受付、コマンドパース、UI表示
- **依存**: `services/`, `types/`, `constants/`

##### `src/cli/commands/`
- **役割**: コマンド実装
- **責任**: 各コマンドのビジネスロジック呼び出し
- **ファイル命名**: `<コマンド名>.ts`
- **エクスポート**: `index.ts` でバレルエクスポート

##### `src/cli/ui/`
- **役割**: UI表示ユーティリティ
- **責任**: テーブル表示、カラー出力、プロンプト
- **ファイル命名**: `<機能名>.ts`

#### `src/services/`
- **役割**: サービスレイヤー
- **責任**: ビジネスロジック、データ操作
- **依存**: `types/`, `utils/`, `constants/`
- **ファイル命名**: `<サービス名>.ts`（PascalCase）

#### `src/types/`
- **役割**: 型定義
- **責任**: TypeScript型定義
- **依存**: なし（他レイヤーから参照される）
- **ファイル命名**: `<ドメイン名>.ts`（小文字）
- **エクスポート**: `index.ts` でバレルエクスポート

#### `src/utils/`
- **役割**: ユーティリティ関数
- **責任**: 汎用的な関数、ヘルパー
- **依存**: `types/`
- **ファイル命名**: `<機能名>.ts`（camelCase）
- **エクスポート**: `index.ts` でバレルエクスポート

#### `src/constants/`
- **役割**: 定数定義
- **責任**: アプリケーション全体で使用する定数
- **依存**: なし
- **ファイル命名**: `<ドメイン名>.ts`（camelCase）
- **エクスポート**: `index.ts` でバレルエクスポート

### テストディレクトリ（`tests/`）

#### `tests/unit/`
- **役割**: 単体テスト
- **対象**: `services/`, `utils/`, `constants/`
- **ファイル命名**: `<テスト対象>.test.ts`

#### `tests/integration/`
- **役割**: 統合テスト
- **対象**: `cli/commands/`
- **ファイル命名**: `<テスト対象>.test.ts`

#### `tests/e2e/`
- **役割**: E2Eテスト（将来的）
- **対象**: コマンド全体のフロー

#### `tests/fixtures/`
- **役割**: テストデータ
- **内容**: モックデータ、サンプルファイル

## ファイル配置ルール

### 新規ファイル作成時の原則

1. **責任の明確化**
   - 1ファイル1責任
   - 関連する機能は同一ディレクトリに配置

2. **命名規則**
   - TypeScript/JavaScriptファイル: camelCase
   - クラス定義ファイル: PascalCase
   - テストファイル: `<対象>.test.ts`
   - 型定義ファイル: 小文字

3. **エクスポート**
   - 各ディレクトリに `index.ts` を配置
   - バレルエクスポートで公開インターフェースを明示

### 具体例

#### 新しいコマンドの追加

```
src/cli/commands/
└── newCommand.ts       # 新しいコマンド実装
```

`src/cli/commands/index.ts` に追加:
```typescript
export * from './newCommand';
```

#### 新しいサービスの追加

```
src/services/
└── NewService.ts       # 新しいサービス
```

`src/services/index.ts` に追加:
```typescript
export * from './NewService';
```

#### 新しい型の追加

```
src/types/
└── newType.ts          # 新しい型定義
```

`src/types/index.ts` に追加:
```typescript
export * from './newType';
```

## Git管理ルール

### Git管理するファイル

- ソースコード (`src/`)
- テストコード (`tests/`)
- ドキュメント (`docs/`, `.steering/`)
- 設定ファイル (`package.json`, `tsconfig.json`, etc.)
- ライセンス、README、CHANGELOG

### Git管理しないファイル（`.gitignore`）

```gitignore
# 依存関係
node_modules/

# ビルド成果物
dist/

# テストカバレッジ
coverage/

# ログ
*.log
npm-debug.log*

# OS固有ファイル
.DS_Store
Thumbs.db

# エディタ設定
.vscode/
.idea/
*.swp
*.swo

# 環境変数
.env
.env.local

# 一時ファイル
*.tmp
tmp/
```

## npm公開ルール

### npm公開するファイル（`package.json` の `files`）

```json
{
  "files": [
    "dist",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ]
}
```

### npm公開しないファイル（`.npmignore`）

```
# ソースコード（ビルド済みのdistのみ公開）
src/

# テスト
tests/

# ドキュメント（README以外）
docs/
.steering/

# 設定ファイル
tsconfig.json
eslint.config.js
.prettierrc
vitest.config.ts

# GitHub設定
.github/

# その他
.gitignore
.npmignore
```

## ドキュメント配置ルール

### 永続的ドキュメント（`docs/`）

- **配置**: `docs/` 直下
- **形式**: Markdown
- **命名**: kebab-case
- **更新頻度**: 低（基本設計変更時のみ）

### 作業単位のドキュメント（`.steering/`）

- **配置**: `.steering/YYYYMMDD-開発タイトル/`
- **形式**: Markdown
- **ファイル**:
  - `requirements.md`: 要求内容
  - `design.md`: 設計
  - `tasklist.md`: タスクリスト
- **更新頻度**: 作業中のみ

### コード内ドキュメント

- **形式**: JSDoc
- **配置**: ソースコード内
- **対象**: 公開API、複雑なロジック

## ビルド成果物

### `dist/` ディレクトリ構造

```
dist/
├── cli/
│   ├── index.js
│   ├── commands/
│   └── ui/
├── services/
│   ├── TaskManager.js
│   ├── PriorityEstimator.js
│   └── FileStorage.js
├── types/
│   ├── task.d.ts
│   ├── config.d.ts
│   └── index.d.ts
├── utils/
│   ├── validation.js
│   └── dateFormat.js
├── constants/
│   ├── taskStatus.js
│   └── taskPriority.js
└── index.js
```

### 型定義ファイル（`.d.ts`）

- TypeScriptコンパイル時に自動生成
- npm公開時に含める
- TypeScript利用者への型情報提供

## 環境別設定

### 開発環境

- `NODE_ENV=development`
- ソースマップ有効
- デバッグログ有効

### 本番環境

- `NODE_ENV=production`
- コード圧縮・最適化
- デバッグログ無効

## セキュリティ

### 機密情報の管理

- `.env` ファイルは Git 管理外
- API キー等は環境変数で管理
- コード内にハードコードしない

### パーミッション

- `dist/cli/index.js`: 実行可能（shebang付き）
- その他: 読み取り専用

## まとめ

本リポジトリ構造は、以下の原則に基づいて設計されています：

1. **明確な責任分離**: CLI / Service / Data レイヤー
2. **拡張性**: 新しいコマンド・サービスの追加が容易
3. **保守性**: 一貫した命名規則とディレクトリ構造
4. **テスト容易性**: テストコードの明確な分離
5. **ドキュメント管理**: 永続的ドキュメントと作業単位のドキュメントの分離

この構造により、チーム開発やオープンソース化にも対応できる
堅牢で拡張可能なコードベースを維持できます。
