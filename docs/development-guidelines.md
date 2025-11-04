# 開発ガイドライン (Development Guidelines)

## 概要

本ドキュメントは、Devtaskプロジェクトの開発における標準的なコーディング規約、
命名規則、スタイリング規約、テスト規約、Git規約を定義します。

すべての開発者はこのガイドラインに従ってコードを記述することで、
コードベースの一貫性と保守性を維持します。

## コーディング規約

### TypeScript設定

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

#### 厳格モード

すべてのTypeScriptファイルで厳格モードを有効にします。

```typescript
// ✅ Good
const value: string = getValue();

// ❌ Bad
const value = getValue(); // 型推論に頼らず、明示的に型を指定
```

### コーディングスタイル

#### インデント
- **スペース2つ**を使用
- タブは使用しない

```typescript
// ✅ Good
function example() {
  if (condition) {
    doSomething();
  }
}

// ❌ Bad (4スペース)
function example() {
    if (condition) {
        doSomething();
    }
}
```

#### セミコロン
- **セミコロンを使用しない**

```typescript
// ✅ Good
const name = 'Devtask'
const version = '1.0.0'

// ❌ Bad
const name = 'Devtask';
const version = '1.0.0';
```

#### クォート
- **シングルクォート**を使用
- テンプレートリテラルは変数埋め込み時のみ

```typescript
// ✅ Good
const name = 'Devtask'
const message = `Hello, ${name}!`

// ❌ Bad
const name = "Devtask"
const message = "Hello, " + name + "!"
```

#### 行の長さ
- **最大100文字**
- 超える場合は適切に改行

```typescript
// ✅ Good
const result = calculatePriorityScore(
  task,
  options,
  weights
)

// ❌ Bad
const result = calculatePriorityScore(task, options, weights, additionalParams, moreParams)
```

#### 改行
- **LF (`\n`)** を使用
- CRLF (`\r\n`) は使用しない

### 命名規則

#### ファイル名

| 種類 | 命名規則 | 例 |
|------|----------|-----|
| コマンド | camelCase | `add.ts`, `list.ts` |
| サービス | PascalCase | `TaskManager.ts`, `PriorityEstimator.ts` |
| 型定義 | camelCase | `task.ts`, `config.ts` |
| ユーティリティ | camelCase | `validation.ts`, `dateFormat.ts` |
| 定数 | camelCase | `taskStatus.ts`, `paths.ts` |
| テスト | `<対象>.test.ts` | `TaskManager.test.ts` |

#### 変数名

```typescript
// ✅ Good: camelCase
const taskManager = new TaskManager()
const priorityScore = calculateScore()
const isCompleted = task.status === 'done'

// ❌ Bad: snake_case, PascalCase
const task_manager = new TaskManager()
const PriorityScore = calculateScore()
```

#### 定数名

```typescript
// ✅ Good: UPPER_SNAKE_CASE
const MAX_TITLE_LENGTH = 200
const DEFAULT_PRIORITY = 'medium'
const DEVTASK_DIR = '.devtask'

// ❌ Bad
const maxTitleLength = 200
const defaultPriority = 'medium'
```

#### クラス名

```typescript
// ✅ Good: PascalCase
class TaskManager {}
class PriorityEstimator {}
class FileStorage {}

// ❌ Bad
class taskManager {}
class priority_estimator {}
```

#### インターフェース・型名

```typescript
// ✅ Good: PascalCase
interface Task {}
type TaskStatus = 'todo' | 'in-progress' | 'done'
interface PriorityScore {}

// ❌ Bad
interface task {}
type taskStatus = 'todo' | 'in-progress' | 'done'
```

#### 関数名

```typescript
// ✅ Good: camelCase, 動詞で始める
function createTask() {}
function calculateScore() {}
function isValidTitle() {}

// ❌ Bad
function CreateTask() {}
function score() {}
function validTitle() {}
```

#### プライベートメンバー

```typescript
// ✅ Good: #プレフィックス（TypeScript 4.3+）
class TaskManager {
  #tasks: Task[] = []

  #loadTasks() {}
}

// ✅ Good: _プレフィックス（従来の方法）
class TaskManager {
  private _tasks: Task[] = []

  private _loadTasks() {}
}
```

### インポート規約

#### インポート順序

1. Node.js標準モジュール
2. 外部パッケージ
3. 内部モジュール（絶対パス）
4. 相対パス

```typescript
// ✅ Good
import path from 'path'
import fs from 'fs/promises'

import chalk from 'chalk'
import { Command } from 'commander'

import { TaskManager } from '@/services/TaskManager'
import { Task, TaskStatus } from '@/types'

import { validateTitle } from '../utils/validation'
```

#### エイリアスインポート

`tsconfig.json` でパスエイリアスを設定:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

```typescript
// ✅ Good
import { TaskManager } from '@/services/TaskManager'

// ❌ Bad
import { TaskManager } from '../../../services/TaskManager'
```

### エラーハンドリング

#### カスタムエラークラス

```typescript
// ✅ Good
class DevtaskError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DevtaskError'
  }
}

throw new ValidationError('Task title is required')
```

#### Try-Catch

```typescript
// ✅ Good
try {
  const tasks = await taskManager.getTasks()
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(chalk.red(`✗ ${error.message}`))
  } else {
    console.error(chalk.red('✗ Unexpected error'))
    console.error(error)
  }
  process.exit(1)
}

// ❌ Bad: エラーを無視
try {
  const tasks = await taskManager.getTasks()
} catch (error) {
  // 何もしない
}
```

### 非同期処理

#### Async/Await

```typescript
// ✅ Good
async function loadTasks(): Promise<Task[]> {
  const data = await fs.readFile(tasksPath, 'utf-8')
  return JSON.parse(data).tasks
}

// ❌ Bad: Promise then/catch
function loadTasks(): Promise<Task[]> {
  return fs.readFile(tasksPath, 'utf-8')
    .then(data => JSON.parse(data).tasks)
}
```

#### Promise.all

```typescript
// ✅ Good: 並列実行
const [tasks, config] = await Promise.all([
  loadTasks(),
  loadConfig()
])

// ❌ Bad: 直列実行
const tasks = await loadTasks()
const config = await loadConfig()
```

### コメント

#### JSDoc

公開APIには必ずJSDocを記述:

```typescript
/**
 * タスクの優先度を自動推定する
 *
 * @param task - 推定対象のタスク
 * @returns 推定された優先度スコア
 *
 * @example
 * ```typescript
 * const score = priorityEstimator.estimate(task)
 * console.log(score.estimatedPriority) // 'high'
 * ```
 */
function estimate(task: Task): PriorityScore {
  // ...
}
```

#### インラインコメント

複雑なロジックには説明コメントを追加:

```typescript
// ✅ Good
// 期限までの残り日数を計算
const daysUntilDue = differenceInDays(dueDate, now)

// 加重平均でスコアを計算
// 期限が最も重要（50%）、次にステータス（30%）、経過時間（20%）
const totalScore =
  dueDateScore * 0.5 +
  statusScore * 0.3 +
  ageScore * 0.2

// ❌ Bad: 不要なコメント
// タイトルを取得
const title = task.title
```

## テスト規約

### テストファイル配置

```
tests/
├── unit/
│   └── services/
│       └── TaskManager.test.ts
├── integration/
│   └── cli/
│       └── add.test.ts
└── fixtures/
    └── tasks.json
```

### テスト命名

```typescript
// ✅ Good
describe('TaskManager', () => {
  describe('createTask', () => {
    it('should create a task with valid data', () => {})
    it('should throw ValidationError for empty title', () => {})
    it('should set default priority to medium', () => {})
  })
})

// ❌ Bad
describe('TaskManager', () => {
  it('test1', () => {})
  it('test2', () => {})
})
```

### テストパターン

#### Arrange-Act-Assert (AAA)

```typescript
it('should calculate priority score correctly', () => {
  // Arrange: 準備
  const task: Task = {
    id: '1',
    title: 'Test',
    status: 'todo',
    dueDate: addDays(new Date(), 2).toISOString(),
    // ...
  }

  // Act: 実行
  const score = priorityEstimator.estimate(task)

  // Assert: 検証
  expect(score.estimatedPriority).toBe('high')
  expect(score.totalScore).toBeGreaterThan(70)
})
```

### モック

```typescript
import { vi } from 'vitest'

it('should load tasks from file', async () => {
  // ファイルシステムをモック
  vi.mock('fs/promises', () => ({
    readFile: vi.fn().mockResolvedValue(JSON.stringify({ tasks: [] }))
  }))

  const tasks = await fileStorage.loadTasks()
  expect(tasks).toEqual([])
})
```

### カバレッジ目標

- **単体テスト**: 80%以上
- **統合テスト**: 60%以上
- **全体**: 70%以上

## Git規約

### ブランチ戦略

#### ブランチ命名

```
<type>/<short-description>
```

**タイプ:**
- `feature/`: 新機能
- `fix/`: バグ修正
- `refactor/`: リファクタリング
- `docs/`: ドキュメント更新
- `test/`: テスト追加・修正
- `chore/`: ビルド・設定変更

**例:**
```
feature/auto-priority-estimation
fix/task-deletion-bug
refactor/file-storage-module
docs/update-readme
```

### コミットメッセージ

#### フォーマット

```
<type>: <subject>

<body>

<footer>
```

#### タイプ

- `feat`: 新機能
- `fix`: バグ修正
- `refactor`: リファクタリング
- `docs`: ドキュメント
- `test`: テスト
- `chore`: ビルド・設定
- `style`: コードスタイル（機能変更なし）
- `perf`: パフォーマンス改善

#### 例

```
feat: add auto priority estimation

Implement priority estimation algorithm based on:
- Due date proximity
- Task age
- Status change history

The algorithm uses weighted average to calculate
a priority score (0-100) and maps it to high/medium/low.

Closes #42
```

#### コミットメッセージルール

1. **subject**:
   - 50文字以内
   - 小文字で始める
   - 現在形を使用（"add" not "added"）
   - 末尾にピリオドを付けない

2. **body**:
   - 72文字で改行
   - 何を変更したか、なぜ変更したかを説明

3. **footer**:
   - Issue番号の参照
   - Breaking changes

### プルリクエスト

#### タイトル

コミットメッセージと同様のフォーマット:

```
feat: add auto priority estimation
```

#### 説明テンプレート

```markdown
## 概要
優先度自動推定機能を追加

## 変更内容
- [ ] PriorityEstimatorクラスを実装
- [ ] 期限スコア計算ロジック
- [ ] 経過時間スコア計算ロジック
- [ ] ステータススコア計算ロジック
- [ ] 単体テスト追加

## テスト
- [ ] 単体テスト実施
- [ ] 統合テスト実施
- [ ] 手動テスト実施

## 関連Issue
Closes #42

## スクリーンショット（必要に応じて）
```

### コードレビュー

#### レビュー観点

1. **機能**: 仕様通りに動作するか
2. **設計**: アーキテクチャに沿っているか
3. **可読性**: コードが理解しやすいか
4. **テスト**: 十分なテストがあるか
5. **パフォーマンス**: パフォーマンス問題はないか
6. **セキュリティ**: セキュリティリスクはないか

#### レビューコメント例

```markdown
# ✅ Good
suggestion: 変数名を `score` から `priorityScore` に変更して、より明確にしませんか？

# ❌ Bad
これはダメです。修正してください。
```

## リリースプロセス

### バージョニング

Semantic Versioning (SemVer) に従う:

```
MAJOR.MINOR.PATCH

例: 1.2.3
```

- **MAJOR**: 破壊的変更
- **MINOR**: 新機能追加（後方互換性あり）
- **PATCH**: バグフィックス

### CHANGELOG更新

```markdown
# Changelog

## [1.2.0] - 2025-01-15

### Added
- 優先度自動推定機能

### Changed
- タスク一覧のテーブル表示を改善

### Fixed
- タスク削除時のバグを修正

### Deprecated
- 古いAPIを非推奨化

### Removed
- 使用されていない関数を削除

### Security
- セキュリティ脆弱性を修正
```

## ツール設定

### ESLint

```javascript
// eslint.config.js
export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'no-console': 'off' // CLIツールなので許可
    }
  }
]
```

### Prettier

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5",
  "arrowParens": "avoid"
}
```

### EditorConfig

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{ts,js,json}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

## パフォーマンスガイドライン

### 起動時間最適化

```typescript
// ✅ Good: 遅延ロード
async function showTask(id: string) {
  const chalk = await import('chalk')
  // ...
}

// ❌ Bad: 全てをトップレベルでインポート
import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'
```

### メモリ使用量

```typescript
// ✅ Good: ストリーム処理（大量データ）
import { createReadStream } from 'fs'

const stream = createReadStream('large-file.json')

// ❌ Bad: 全てをメモリに読み込む
const data = await fs.readFile('large-file.json', 'utf-8')
```

## セキュリティガイドライン

### 入力バリデーション

```typescript
// ✅ Good
function validateTitle(title: string): void {
  if (typeof title !== 'string') {
    throw new ValidationError('Title must be a string')
  }
  if (title.trim().length === 0) {
    throw new ValidationError('Title is required')
  }
  if (title.length > 200) {
    throw new ValidationError('Title must be 200 characters or less')
  }
}

// ❌ Bad: バリデーションなし
function createTask(title: string) {
  // titleをそのまま使用
}
```

### パスインジェクション対策

```typescript
// ✅ Good
import path from 'path'

const devtaskDir = path.join(process.cwd(), '.devtask')
if (!devtaskDir.startsWith(process.cwd())) {
  throw new Error('Invalid path')
}

// ❌ Bad
const devtaskDir = process.cwd() + '/' + userInput
```

## ドキュメント規約

### README更新

機能追加時は必ずREADMEを更新:

```markdown
## Features

- ✅ Task CRUD operations
- ✅ Status management (todo/in-progress/done)
- ✅ Priority management (high/medium/low)
- ✅ **Auto priority estimation** (NEW!)
```

### API Documentation

公開APIには必ずドキュメントを記述:

```typescript
/**
 * タスク管理サービス
 *
 * @public
 */
export class TaskManager {
  /**
   * 新しいタスクを作成する
   *
   * @param data - タスクデータ
   * @returns 作成されたタスク
   * @throws {ValidationError} バリデーションエラー
   */
  async createTask(data: CreateTaskData): Promise<Task> {
    // ...
  }
}
```

## まとめ

本ガイドラインに従うことで、以下の利点があります：

1. **一貫性**: コードベース全体で一貫したスタイル
2. **可読性**: 誰が読んでも理解しやすいコード
3. **保守性**: 変更・拡張が容易
4. **品質**: バグが少なく、テストされたコード
5. **協業**: チーム開発がスムーズ

すべての開発者がこのガイドラインを遵守することで、
高品質なDevtaskを維持・発展させていくことができます。
