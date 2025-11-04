# 初回実装の設計

## 実装アプローチ

レイヤードアーキテクチャに従い、以下の順序で実装する：

1. **型定義・定数** → **データレイヤー** → **サービスレイヤー** → **CLIレイヤー**
2. 各レイヤーは下位レイヤーに依存
3. まず基本機能を実装し、優先度自動推定機能を追加

## 実装の順序

### フェーズ1: 基盤構築
1. プロジェクト構造の作成
2. TypeScript設定
3. 型定義（Task, Config, etc.）
4. 定数定義（TaskStatus, TaskPriority）

### フェーズ2: データレイヤー
5. FileStorage実装（JSON読み書き）
6. プロジェクト初期化機能

### フェーズ3: サービスレイヤー
7. TaskManager実装（CRUD操作）
8. PriorityEstimator実装（優先度自動推定）

### フェーズ4: CLIレイヤー
9. CLI基本構造（Commander.js）
10. UI表示（テーブル、カラー）
11. 各コマンド実装

### フェーズ5: 統合・テスト
12. 全体の動作確認
13. エラーハンドリング追加
14. ヘルプメッセージ追加

## 変更するコンポーネント

### 新規作成

#### 型定義 (`src/types/`)
- `task.ts`: Task, TaskStatus, TaskPriority, StatusChange
- `config.ts`: Config
- `filter.ts`: FilterOptions
- `stats.ts`: TaskStats, PriorityScore

#### 定数 (`src/constants/`)
- `taskStatus.ts`: STATUS定数
- `taskPriority.ts`: PRIORITY定数
- `paths.ts`: ファイルパス定数
- `messages.ts`: メッセージ定数

#### サービス (`src/services/`)
- `FileStorage.ts`: ファイル読み書き
- `TaskManager.ts`: タスク管理ロジック
- `PriorityEstimator.ts`: 優先度推定ロジック

#### CLI (`src/cli/`)
- `index.ts`: CLIエントリーポイント
- `commands/init.ts`: プロジェクト初期化
- `commands/add.ts`: タスク作成
- `commands/list.ts`: タスク一覧
- `commands/show.ts`: タスク詳細
- `commands/edit.ts`: タスク編集
- `commands/delete.ts`: タスク削除
- `commands/status.ts`: ステータス変更
- `commands/priority.ts`: 優先度変更
- `commands/stats.ts`: 統計情報
- `ui/table.ts`: テーブル表示
- `ui/colors.ts`: カラー定義
- `ui/prompts.ts`: インタラクティブプロンプト

#### ユーティリティ (`src/utils/`)
- `validation.ts`: バリデーション関数
- `dateFormat.ts`: 日付フォーマット
- `fileHelpers.ts`: ファイル操作ヘルパー

#### ルート
- `package.json`: 依存関係定義
- `tsconfig.json`: TypeScript設定
- `eslint.config.js`: ESLint設定
- `.prettierrc`: Prettier設定

## データ構造の変更

### tasks.json

```json
{
  "tasks": [
    {
      "id": "uuid-v4",
      "title": "string",
      "description": "string",
      "status": "todo" | "in-progress" | "done",
      "priority": "high" | "medium" | "low",
      "estimatedPriority": "high" | "medium" | "low" (optional),
      "dueDate": "ISO 8601 string" | null,
      "createdAt": "ISO 8601 string",
      "updatedAt": "ISO 8601 string",
      "statusHistory": [
        {
          "from": "todo",
          "to": "in-progress",
          "changedAt": "ISO 8601 string"
        }
      ]
    }
  ]
}
```

### config.json

```json
{
  "projectName": "string",
  "version": "1.0.0",
  "createdAt": "ISO 8601 string",
  "autoPriority": false
}
```

## 主要クラス・関数の設計

### FileStorage

```typescript
class FileStorage {
  private devtaskDir: string
  private tasksPath: string
  private configPath: string

  constructor()
  async ensureDevtaskDir(): Promise<void>
  async loadTasks(): Promise<Task[]>
  async saveTasks(tasks: Task[]): Promise<void>
  async loadConfig(): Promise<Config>
  async saveConfig(config: Config): Promise<void>
  async initialize(projectName: string): Promise<void>
}
```

### TaskManager

```typescript
class TaskManager {
  private storage: FileStorage
  private priorityEstimator: PriorityEstimator

  constructor(storage: FileStorage)
  async createTask(data: CreateTaskData): Promise<Task>
  async getTasks(filters?: FilterOptions): Promise<Task[]>
  async getTaskById(id: string): Promise<Task | null>
  async updateTask(id: string, updates: Partial<Task>): Promise<Task>
  async deleteTask(id: string): Promise<void>
  async changeStatus(id: string, status: TaskStatus): Promise<Task>
  async changePriority(id: string, priority: TaskPriority): Promise<Task>
  async getStats(): Promise<TaskStats>
  async estimatePriorities(tasks: Task[]): Promise<Task[]>
}
```

### PriorityEstimator

```typescript
class PriorityEstimator {
  estimate(task: Task): PriorityScore
  private calculateDueDateScore(task: Task): number
  private calculateAgeScore(task: Task): number
  private calculateStatusScore(task: Task): number
  private calculateTotalScore(scores: {
    dueDate: number
    age: number
    status: number
  }): PriorityScore
}
```

## 優先度自動推定アルゴリズム詳細

### スコア計算

```typescript
// 期限スコア（0-100）
function calculateDueDateScore(task: Task): number {
  if (!task.dueDate) return 0
  const daysUntilDue = differenceInDays(new Date(task.dueDate), new Date())

  if (daysUntilDue < 0) return 100        // 期限切れ
  if (daysUntilDue <= 1) return 90        // 1日以内
  if (daysUntilDue <= 3) return 70        // 3日以内
  if (daysUntilDue <= 7) return 50        // 1週間以内
  if (daysUntilDue <= 14) return 30       // 2週間以内
  return 10                                // それ以上
}

// 経過時間スコア（0-100）
function calculateAgeScore(task: Task): number {
  const daysSinceCreated = differenceInDays(new Date(), new Date(task.createdAt))

  if (daysSinceCreated >= 30) return 80   // 1ヶ月以上
  if (daysSinceCreated >= 14) return 60   // 2週間以上
  if (daysSinceCreated >= 7) return 40    // 1週間以上
  if (daysSinceCreated >= 3) return 20    // 3日以上
  return 0                                 // それ未満
}

// ステータススコア（0-100）
function calculateStatusScore(task: Task): number {
  if (task.status === 'done') return 0
  if (task.status === 'in-progress') return 90

  // 未着手の場合、ステータス変更履歴を考慮
  const changeCount = task.statusHistory.length
  return Math.min(30 + changeCount * 10, 100)
}

// 総合スコア
const weights = { dueDate: 0.5, age: 0.2, status: 0.3 }
const totalScore =
  dueDateScore * weights.dueDate +
  ageScore * weights.age +
  statusScore * weights.status

// 優先度判定
if (totalScore >= 70) return 'high'
if (totalScore >= 40) return 'medium'
return 'low'
```

## UI設計

### テーブル表示（list コマンド）

```
┌────┬─────────────────┬──────────────┬──────────┬──────────┬────────────┐
│ ID │ Title           │ Status       │ Priority │ Auto     │ Due Date   │
├────┼─────────────────┼──────────────┼──────────┼──────────┼────────────┤
│ 1  │ バグ修正        │ in-progress  │ high     │ [A:high] │ 2025-11-05 │
│ 2  │ 機能追加        │ todo         │ medium   │ [A:high] │ 2025-11-03 │
└────┴─────────────────┴──────────────┴──────────┴──────────┴────────────┘

Total: 2 tasks | In Progress: 1 | Completed: 0/2 (0%)
```

### カラーコーディング

- **ステータス**:
  - todo: グレー（dim）
  - in-progress: 青（cyan）
  - done: 緑（green）

- **優先度**:
  - high: 赤（red）
  - medium: 黄（yellow）
  - low: 緑（green）

### エラーメッセージ

```bash
✗ Error: Task not found: 999
  Run 'devtask list' to see all tasks
```

### 成功メッセージ

```bash
✓ Task created successfully! (ID: 1)
✓ Status changed: todo → in-progress
✓ Task deleted successfully
```

## エラーハンドリング

### バリデーションエラー

```typescript
class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// 使用例
if (!title || title.trim().length === 0) {
  throw new ValidationError('Task title is required')
}
```

### ファイルシステムエラー

```typescript
class FileSystemError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FileSystemError'
  }
}

// 使用例
try {
  await fs.readFile(tasksPath, 'utf-8')
} catch (error) {
  throw new FileSystemError('Failed to read tasks file')
}
```

### タスク未発見エラー

```typescript
class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Task not found: ${id}`)
    this.name = 'TaskNotFoundError'
  }
}
```

## 影響範囲の分析

### 新規ファイル
- すべて新規作成
- 既存ファイルへの影響なし

### 依存関係の追加
- `package.json` に依存パッケージを追加
- Node.js 18.x以上が必要

### Git管理
- `.devtask/` をGit管理に含めるか選択可能（初期化時）
- `.gitignore` への自動追加（オプション）

## パフォーマンス考慮事項

### 起動時間
- 遅延ロードを活用（100ms以内の起動を目標）

### ファイルI/O
- JSONファイルの読み書きを最小化
- キャッシング戦略（将来的に）

### メモリ使用量
- タスク1000件でも問題なく動作する設計

## セキュリティ考慮事項

### 入力バリデーション
- すべてのユーザー入力をバリデーション
- 文字数制限の厳守

### パスインジェクション対策
- パスを常に検証
- process.cwd() からの相対パスのみ許可

### ファイルパーミッション
- `.devtask/`: 755
- JSONファイル: 644

## 次回以降の拡張ポイント

- テストコード追加（Vitest）
- Git連携機能
- 期限通知機能
- タグ機能
- データエクスポート/インポート
- パフォーマンスチューニング
