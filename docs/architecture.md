# 技術仕様書 (Architecture Document)

## テクノロジースタック

### ランタイム・言語

#### Node.js 18.x以上
- **理由**:
  - LTSバージョンで安定性が高い
  - ES Modules完全サポート
  - 高速な起動時間
  - クロスプラットフォーム対応
- **最小要件**: Node.js 18.0.0
- **推奨バージョン**: Node.js 20.x (LTS)

#### TypeScript 5.x
- **理由**:
  - 型安全性による開発効率向上
  - エディタサポート（自動補完、リファクタリング）
  - 大規模コードベースの保守性向上
  - ランタイムエラーの削減
- **設定**: 厳格モード（strict: true）

### CLIフレームワーク

#### Commander.js 12.x
- **理由**:
  - Node.js CLIのデファクトスタンダード
  - シンプルで直感的なAPI
  - サブコマンド、オプション、エイリアスのサポート
  - 自動ヘルプ生成
- **用途**:
  - コマンドパース
  - オプション処理
  - ヘルプメッセージ生成

#### Inquirer.js 10.x
- **理由**:
  - インタラクティブプロンプトの標準ライブラリ
  - 多様な入力タイプ（テキスト、選択、確認等）
  - カスタマイズ可能
- **用途**:
  - インタラクティブモード
  - タスク編集フォーム
  - 削除確認プロンプト

### UI・表示

#### chalk 5.x
- **理由**:
  - ターミナルカラー出力の標準ライブラリ
  - 軽量で高速
  - True Colorサポート
  - スタイルのチェーン可能
- **用途**:
  - エラーメッセージ（赤）
  - 成功メッセージ（緑）
  - 優先度の色分け
  - ステータスの色分け

#### cli-table3 0.6.x
- **理由**:
  - ASCIIテーブル表示
  - カスタマイズ可能なスタイル
  - Unicode対応
- **用途**:
  - タスク一覧のテーブル表示
  - 統計情報の表示

#### ora 8.x
- **理由**:
  - エレガントなスピナー表示
  - カスタマイズ可能
- **用途**:
  - ファイル読み込み中の表示
  - 処理中のフィードバック

### ユーティリティ

#### date-fns 3.x
- **理由**:
  - 軽量な日付操作ライブラリ
  - Tree-shaking対応
  - 関数型プログラミングスタイル
  - Immutable
- **用途**:
  - 日付のフォーマット
  - 日付の計算（経過日数、残り日数）
  - 期限チェック

#### uuid 10.x
- **理由**:
  - UUID生成の標準ライブラリ
  - RFC4122準拠
  - 衝突リスクが極めて低い
- **用途**:
  - タスクID生成（UUID v4）

#### fs-extra 11.x
- **理由**:
  - Node.js標準fsモジュールの拡張
  - Promise対応
  - 便利なメソッド追加
- **用途**:
  - ファイル・ディレクトリ操作
  - JSONファイルの読み書き

### 開発ツール

#### ESLint 9.x
- **理由**:
  - JavaScriptリンターの標準
  - TypeScript対応
  - カスタマイズ可能
- **設定**:
  - @typescript-eslint/parser
  - @typescript-eslint/eslint-plugin
  - eslint-config-prettier

#### Prettier 3.x
- **理由**:
  - コードフォーマッターの標準
  - 一貫したコードスタイル
  - ESLintとの統合
- **設定**:
  - セミコロンなし
  - シングルクォート
  - インデント2スペース

#### Vitest 2.x（テスト用）
- **理由**:
  - Viteベースの高速テストランナー
  - Jest互換API
  - TypeScript完全サポート
  - ESM対応
- **用途**:
  - 単体テスト
  - 統合テスト

#### tsx 4.x（開発用）
- **理由**:
  - TypeScriptの高速実行
  - トランスパイル不要
- **用途**:
  - 開発中のTypeScript実行
  - デバッグ

## アーキテクチャパターン

### レイヤードアーキテクチャ

```
┌─────────────────────────────────────┐
│      CLI Layer (Presentation)      │
│   Commander.js, Inquirer.js, UI    │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│     Service Layer (Business)       │
│  TaskManager, PriorityEstimator    │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│      Data Layer (Persistence)      │
│         FileStorage                 │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│      File System (.devtask/)       │
└─────────────────────────────────────┘
```

### 依存関係の原則
- 上位レイヤーは下位レイヤーに依存
- 下位レイヤーは上位レイヤーに依存しない
- 各レイヤーは明確な責任を持つ

## ディレクトリ構造

```
devtask/
├── src/                            # ソースコード
│   ├── cli/                       # CLIレイヤー
│   │   ├── index.ts              # CLIエントリーポイント
│   │   ├── commands/             # コマンド定義
│   │   │   ├── add.ts
│   │   │   ├── list.ts
│   │   │   ├── show.ts
│   │   │   ├── edit.ts
│   │   │   ├── delete.ts
│   │   │   ├── status.ts
│   │   │   ├── priority.ts
│   │   │   ├── stats.ts
│   │   │   └── init.ts
│   │   └── ui/                   # UI表示
│   │       ├── table.ts          # テーブル表示
│   │       ├── colors.ts         # カラー定義
│   │       └── prompts.ts        # インタラクティブプロンプト
│   ├── services/                 # サービスレイヤー
│   │   ├── TaskManager.ts        # タスク管理ロジック
│   │   ├── PriorityEstimator.ts  # 優先度推定ロジック
│   │   └── FileStorage.ts        # ファイル操作
│   ├── types/                    # 型定義
│   │   ├── task.ts
│   │   ├── config.ts
│   │   └── index.ts
│   ├── utils/                    # ユーティリティ
│   │   ├── validation.ts         # バリデーション
│   │   ├── dateFormat.ts         # 日付フォーマット
│   │   └── index.ts
│   ├── constants/                # 定数定義
│   │   ├── taskStatus.ts
│   │   ├── taskPriority.ts
│   │   ├── paths.ts
│   │   └── index.ts
│   └── index.ts                  # パッケージエントリーポイント
├── tests/                        # テストコード
│   ├── unit/                     # 単体テスト
│   │   ├── services/
│   │   ├── utils/
│   │   └── constants/
│   ├── integration/              # 統合テスト
│   │   └── cli/
│   └── fixtures/                 # テストデータ
├── dist/                         # ビルド成果物
├── docs/                         # ドキュメント
├── .devtask/                     # Devtask自身のタスク管理
├── package.json
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
├── .gitignore
└── README.md
```

## ビルド・デプロイ戦略

### ビルドプロセス

```bash
# TypeScriptコンパイル
tsc

# 成果物
dist/
├── cli/
├── services/
├── types/
├── utils/
├── constants/
└── index.js
```

### パッケージング

#### package.json

```json
{
  "name": "devtask",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "devtask": "./dist/cli/index.js"
  },
  "files": [
    "dist"
  ],
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### npm公開
- npmパッケージとして公開
- `npm install -g devtask` でグローバルインストール
- `npx devtask` で実行可能

### バージョニング
- **Semantic Versioning** (SemVer) に従う
  - MAJOR: 破壊的変更
  - MINOR: 新機能追加（後方互換性あり）
  - PATCH: バグフィックス

## データ永続化戦略

### ファイルシステム構造

```
project-root/
└── .devtask/
    ├── config.json          # プロジェクト設定
    └── tasks.json           # タスクデータ
```

### データ保存場所の決定ロジック

1. カレントディレクトリから親ディレクトリへ遡って `.devtask/` を探索
2. 見つかった場合、そのプロジェクトのデータを使用
3. 見つからない場合、エラーメッセージ表示（`devtask init` を促す）

### ファイルフォーマット

#### config.json

```json
{
  "projectName": "string",
  "version": "string",
  "createdAt": "ISO 8601 string",
  "autoPriority": "boolean"
}
```

#### tasks.json

```json
{
  "tasks": [
    {
      "id": "UUID v4 string",
      "title": "string",
      "description": "string",
      "status": "todo | in-progress | done",
      "priority": "high | medium | low",
      "estimatedPriority": "high | medium | low (optional)",
      "dueDate": "ISO 8601 string | null",
      "createdAt": "ISO 8601 string",
      "updatedAt": "ISO 8601 string",
      "statusHistory": [
        {
          "from": "todo | in-progress | done",
          "to": "todo | in-progress | done",
          "changedAt": "ISO 8601 string"
        }
      ]
    }
  ]
}
```

### データ整合性

- **原子性**: ファイル書き込みは一時ファイル → リネームで実現
- **ロック機能**: なし（単一ユーザー想定）
- **バックアップ**: なし（Gitで管理することを推奨）

## パフォーマンス要件

### 目標指標
- **CLI起動時間**: < 100ms
- **コマンド実行時間**: < 50ms
- **1000件のタスク処理**: < 200ms

### 最適化手法

#### 1. 遅延ロード
```typescript
// 使用時にのみインポート
async function showTask(id: string) {
  const { default: chalk } = await import('chalk');
  // ...
}
```

#### 2. キャッシング
```typescript
class FileStorage {
  private cache: Map<string, any> = new Map();

  async loadTasks(): Promise<Task[]> {
    if (this.cache.has('tasks')) {
      return this.cache.get('tasks');
    }
    // ファイル読み込み
    this.cache.set('tasks', tasks);
    return tasks;
  }
}
```

#### 3. 並列処理
```typescript
// 優先度推定を並列実行
const estimations = await Promise.all(
  tasks.map(task => priorityEstimator.estimate(task))
);
```

## セキュリティ要件

### ファイルパーミッション
- **ディレクトリ**: `755` (rwxr-xr-x)
- **JSONファイル**: `644` (rw-r--r--)

### 入力バリデーション
```typescript
function validateTitle(title: string): void {
  if (!title || title.trim().length === 0) {
    throw new Error('Task title is required');
  }
  if (title.length > 200) {
    throw new Error('Task title must be 200 characters or less');
  }
}
```

### パスインジェクション対策
```typescript
import path from 'path';

function getDevtaskDir(): string {
  // 絶対パスに変換
  const cwd = process.cwd();
  const devtaskDir = path.join(cwd, '.devtask');

  // パストラバーサル防止
  if (!devtaskDir.startsWith(cwd)) {
    throw new Error('Invalid path');
  }

  return devtaskDir;
}
```

### コマンドインジェクション対策
- ユーザー入力を直接シェルコマンドに使用しない
- `child_process.exec` を避け、`execFile` や `spawn` を使用

## エラーハンドリング

### エラー階層

```typescript
class DevtaskError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DevtaskError';
  }
}

class ValidationError extends DevtaskError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class FileSystemError extends DevtaskError {
  constructor(message: string) {
    super(message);
    this.name = 'FileSystemError';
  }
}

class TaskNotFoundError extends DevtaskError {
  constructor(id: string) {
    super(`Task not found: ${id}`);
    this.name = 'TaskNotFoundError';
  }
}
```

### エラー処理フロー

```typescript
try {
  // コマンド実行
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(chalk.red(`✗ ${error.message}`));
    process.exit(1);
  } else if (error instanceof FileSystemError) {
    console.error(chalk.red(`✗ ${error.message}`));
    console.error(chalk.dim('  Run "devtask init" to initialize'));
    process.exit(1);
  } else if (error instanceof TaskNotFoundError) {
    console.error(chalk.red(`✗ ${error.message}`));
    console.error(chalk.dim('  Run "devtask list" to see all tasks'));
    process.exit(1);
  } else {
    console.error(chalk.red('✗ Unexpected error occurred'));
    console.error(error);
    process.exit(1);
  }
}
```

## テスト戦略

### テストピラミッド

```
         ┌─────────┐
         │   E2E   │  少数
         ├─────────┤
         │ Integration │  中程度
         ├─────────┤
         │   Unit    │  多数
         └─────────┘
```

### 単体テスト
- **対象**: Utils, Services, Constants
- **ツール**: Vitest
- **カバレッジ目標**: 80%以上

```typescript
import { describe, it, expect } from 'vitest';
import { validateTitle } from '../utils/validation';

describe('validateTitle', () => {
  it('should throw error if title is empty', () => {
    expect(() => validateTitle('')).toThrow('Task title is required');
  });

  it('should throw error if title exceeds 200 characters', () => {
    const longTitle = 'a'.repeat(201);
    expect(() => validateTitle(longTitle)).toThrow('must be 200 characters or less');
  });

  it('should pass for valid title', () => {
    expect(() => validateTitle('Valid title')).not.toThrow();
  });
});
```

### 統合テスト
- **対象**: CLI Commands
- **ツール**: Vitest + Mock FileSystem
- **カバレッジ目標**: 60%以上

### E2Eテスト（将来的）
- **対象**: コマンド全体のフロー
- **ツール**: Vitest + 実際のファイルシステム

## CI/CD（将来的）

### GitHub Actions

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  publish:
    needs: test
    if: startsWith(github.ref, 'refs/tags/')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## クロスプラットフォーム対応

### サポート対象OS
- **macOS**: 12.x以上
- **Linux**: Ubuntu 20.04以上
- **Windows**: Windows 10以上

### パス処理
```typescript
import path from 'path';

// クロスプラットフォーム対応のパス結合
const configPath = path.join(devtaskDir, 'config.json');

// パス区切り文字の自動変換
// Unix: /
// Windows: \
```

### 改行コード
- LF (`\n`) を標準とする
- `.gitattributes` で設定

```
* text=auto eol=lf
```

## 依存関係管理

### パッケージマネージャ
- **npm**: 標準パッケージマネージャ
- **pnpm**: 高速化が必要な場合（オプション）

### ロックファイル
- `package-lock.json` をGit管理
- `npm ci` でクリーンインストール

### セキュリティ監査
```bash
npm audit
npm audit fix
```

### 依存関係の更新戦略
- 月1回の依存関係チェック
- セキュリティアップデートは即座に適用
- メジャーバージョンアップは慎重に

## モニタリング・ロギング（将来的）

### ロギング
- デバッグモード: `DEBUG=devtask:* devtask list`
- ログレベル: ERROR, WARN, INFO, DEBUG

### エラー追跡
- Sentry等のエラー追跡ツール（オプション）
- ユーザー同意の上で匿名エラーレポート

## ドキュメント管理

### コード内ドキュメント
```typescript
/**
 * タスクの優先度を自動推定する
 *
 * @param task - 推定対象のタスク
 * @returns 推定された優先度スコア
 *
 * @example
 * const score = priorityEstimator.estimate(task);
 * console.log(score.estimatedPriority); // 'high'
 */
function estimate(task: Task): PriorityScore {
  // ...
}
```

### README
- インストール方法
- 基本的な使い方
- コマンド一覧
- 例

### CHANGELOG
- バージョンごとの変更履歴
- Keep a Changelog形式

## まとめ

本CLIツールは、Node.js + TypeScriptをベースに、Commander.js、Inquirer.js等の
成熟したライブラリを活用し、軽量・高速・クロスプラットフォームな
開発者向けタスク管理ツールとして設計されています。

優先度自動推定機能を中核に、シンプルで直感的なCLI操作を実現し、
開発フローを中断させないスムーズなタスク管理体験を提供します。
