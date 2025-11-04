# ユビキタス言語定義 (Glossary)

## 概要

本ドキュメントは、Devtaskプロジェクトで使用される用語の定義を明確にし、
開発者・ユーザー間のコミュニケーションを円滑にするためのユビキタス言語を定義します。

## ドメイン用語

### タスク管理

#### Task（タスク）
- **定義**: 実行すべき作業単位
- **属性**: タイトル、説明、ステータス、優先度、期限、作成日時、更新日時
- **コード**: `Task` インターフェース
- **例**: "バグ修正"、"機能追加"

#### Task ID（タスクID）
- **定義**: タスクを一意に識別するためのID
- **形式**: UUID v4
- **コード**: `task.id: string`
- **例**: `"550e8400-e29b-41d4-a716-446655440000"`

#### Title（タイトル）
- **定義**: タスクの簡潔な説明
- **制約**: 1～200文字、必須
- **コード**: `task.title: string`
- **例**: "ログイン機能のバグを修正"

#### Description（説明）
- **定義**: タスクの詳細説明
- **制約**: 最大1000文字、任意
- **コード**: `task.description: string`
- **例**: "ユーザー名に特殊文字が含まれる場合にログインできない問題を修正する"

#### Status（ステータス）
- **定義**: タスクの進捗状態
- **値**:
  - `todo`: 未着手
  - `in-progress`: 進行中
  - `done`: 完了
- **コード**: `TaskStatus` 型
- **デフォルト**: `todo`

#### Priority（優先度）
- **定義**: タスクの重要度・緊急度
- **値**:
  - `high`: 高（重要・緊急）
  - `medium`: 中（通常）
  - `low`: 低（後回し可）
- **コード**: `TaskPriority` 型
- **デフォルト**: `medium`

#### Due Date（期限）
- **定義**: タスクの完了期限
- **形式**: ISO 8601形式の日時文字列
- **コード**: `task.dueDate: string | null`
- **例**: `"2025-12-31T23:59:59.000Z"`

#### Created At（作成日時）
- **定義**: タスクが作成された日時
- **形式**: ISO 8601形式の日時文字列
- **コード**: `task.createdAt: string`
- **自動設定**: タスク作成時

#### Updated At（更新日時）
- **定義**: タスクが最後に更新された日時
- **形式**: ISO 8601形式の日時文字列
- **コード**: `task.updatedAt: string`
- **自動更新**: タスク更新時

#### Status History（ステータス変更履歴）
- **定義**: タスクのステータス変更の履歴
- **コード**: `task.statusHistory: StatusChange[]`
- **用途**: 優先度自動推定の材料

### 優先度自動推定

#### Auto Priority Estimation（優先度自動推定）
- **定義**: タスクの期限、経過時間、ステータス変更履歴から優先度を自動推定する機能
- **コード**: `PriorityEstimator` クラス
- **出力**: `estimatedPriority: TaskPriority`

#### Estimated Priority（推定優先度）
- **定義**: 自動推定された優先度
- **コード**: `task.estimatedPriority?: TaskPriority`
- **表示**: `[Auto: high]`、`[A:high]`

#### Priority Score（優先度スコア）
- **定義**: 優先度推定のための総合スコア（0～100）
- **コード**: `PriorityScore` インターフェース
- **計算**: 加重平均（期限50%、ステータス30%、経過時間20%）

#### Due Date Score（期限スコア）
- **定義**: 期限までの残り日数から算出されるスコア
- **範囲**: 0～100
- **コード**: `priorityScore.dueDateScore: number`
- **計算**: 期限が近いほど高スコア

#### Age Score（経過時間スコア）
- **定義**: タスク作成からの経過日数から算出されるスコア
- **範囲**: 0～100
- **コード**: `priorityScore.ageScore: number`
- **計算**: 古いほど高スコア

#### Status Score（ステータススコア）
- **定義**: タスクのステータスとステータス変更履歴から算出されるスコア
- **範囲**: 0～100
- **コード**: `priorityScore.statusScore: number`
- **計算**: `in-progress`は高スコア、`done`は0点

### プロジェクト管理

#### Project（プロジェクト）
- **定義**: タスクを管理する単位（通常はGitリポジトリ単位）
- **識別**: `.devtask/` ディレクトリの存在
- **初期化**: `devtask init`

#### .devtask Directory（.devtaskディレクトリ）
- **定義**: Devtaskのデータ保存ディレクトリ
- **パス**: `<プロジェクトルート>/.devtask/`
- **内容**: `config.json`、`tasks.json`
- **Git管理**: プロジェクトによる（推奨: 管理する）

#### Config（設定）
- **定義**: プロジェクトの設定情報
- **ファイル**: `.devtask/config.json`
- **コード**: `Config` インターフェース
- **内容**: プロジェクト名、バージョン、作成日時、設定オプション

#### Tasks Data（タスクデータ）
- **定義**: タスクの永続化データ
- **ファイル**: `.devtask/tasks.json`
- **形式**: JSON
- **内容**: タスクの配列

### フィルタリング・検索

#### Filter（フィルタ）
- **定義**: タスクを特定条件で絞り込む機能
- **種類**: ステータスフィルタ、優先度フィルタ
- **コード**: `FilterOptions` インターフェース

#### Search（検索）
- **定義**: キーワードでタスクを検索する機能
- **対象**: タイトル、説明
- **方式**: 部分一致
- **コード**: `filterOptions.searchQuery: string`

### 統計情報

#### Stats（統計）
- **定義**: タスクの集計情報
- **コード**: `TaskStats` インターフェース
- **内容**: 総タスク数、完了タスク数、完了率、ステータス別内訳、優先度別内訳

#### Completion Rate（完了率）
- **定義**: 完了タスク数 / 総タスク数 * 100
- **単位**: パーセント（%）
- **コード**: `taskStats.completionRate: number`
- **表示**: 小数点第1位まで

## CLI用語

### Command（コマンド）
- **定義**: CLIで実行する操作
- **例**: `add`, `list`, `delete`, `status`, `init`
- **実装**: `src/cli/commands/`

### Option（オプション）
- **定義**: コマンドに渡す引数
- **形式**: `--option-name value` または `-o value`
- **例**: `--status=todo`, `-p high`

### Argument（引数）
- **定義**: コマンドに渡す位置引数
- **例**: `devtask add "タスクタイトル"` の `"タスクタイトル"`

### Flag（フラグ）
- **定義**: 真偽値を表すオプション
- **形式**: `--flag` または `-f`
- **例**: `--force`, `--auto-priority`

### Alias（エイリアス）
- **定義**: コマンドの別名・ショートカット
- **例**:
  - `devtask start <id>` → `devtask status <id> in-progress`
  - `devtask done <id>` → `devtask status <id> done`

### Interactive Mode（インタラクティブモード）
- **定義**: 対話形式でユーザー入力を受け付けるモード
- **実装**: Inquirer.js
- **例**: `devtask edit 1` でフォーム形式の入力

### Table（テーブル）
- **定義**: タスク一覧をテーブル形式で表示
- **実装**: cli-table3
- **要素**: ヘッダー、ボーダー、行

### Color Coding（カラーコーディング）
- **定義**: ステータスや優先度を色で区別
- **実装**: chalk
- **例**:
  - 高優先度: 赤
  - 中優先度: 黄
  - 低優先度: 緑

### Spinner（スピナー）
- **定義**: 処理中を示すアニメーション
- **実装**: ora
- **用途**: ファイル読み込み中、データ保存中

## 技術用語

### CLI（Command Line Interface）
- **定義**: コマンドラインインターフェース
- **対義語**: GUI（Graphical User Interface）

### Node.js
- **定義**: JavaScript実行環境
- **バージョン**: 18.x以上

### TypeScript
- **定義**: JavaScriptの型付きスーパーセット
- **バージョン**: 5.x

### UUID（Universally Unique Identifier）
- **定義**: 汎用一意識別子
- **バージョン**: v4
- **用途**: タスクID

### ISO 8601
- **定義**: 日時の国際標準形式
- **例**: `2025-01-01T00:00:00.000Z`
- **用途**: タスクの日時フィールド

### JSON（JavaScript Object Notation）
- **定義**: データ交換フォーマット
- **用途**: タスクデータ、設定ファイルの保存形式

### SemVer（Semantic Versioning）
- **定義**: バージョン番号の規則
- **形式**: MAJOR.MINOR.PATCH
- **例**: `1.2.3`

## ビジネス用語

### MVP（Minimum Viable Product）
- **定義**: 最小限の機能を持つ製品
- **範囲**: P0（必須）機能のみ

### P0, P1, P2, P3（Priority 0-3）
- **定義**: 機能の優先順位
- **P0**: 必須（MVPに含む）
- **P1**: 重要
- **P2**: あれば良い
- **P3**: 将来的に

### Roadmap（ロードマップ）
- **定義**: 機能開発の計画
- **フェーズ**: MVP → P1機能 → P2機能

## UI/UX用語

### User Flow（ユーザーフロー）
- **定義**: ユーザーの操作の流れ
- **例**: タスク作成 → 一覧表示 → ステータス変更 → 完了

### Feedback（フィードバック）
- **定義**: ユーザーへの応答
- **種類**: 成功メッセージ、エラーメッセージ、スピナー

### Error Message（エラーメッセージ）
- **定義**: エラー発生時のメッセージ
- **形式**: `✗ <エラー内容>`
- **色**: 赤

### Success Message（成功メッセージ）
- **定義**: 操作成功時のメッセージ
- **形式**: `✓ <成功内容>`
- **色**: 緑

## 英語・日本語対応表

| 英語 | 日本語 | コード上の表記 |
|------|--------|----------------|
| Task | タスク | `Task` |
| Title | タイトル | `title` |
| Description | 説明 | `description` |
| Status | ステータス | `status` |
| Priority | 優先度 | `priority` |
| Due Date | 期限 | `dueDate` |
| Created At | 作成日時 | `createdAt` |
| Updated At | 更新日時 | `updatedAt` |
| Todo | 未着手 | `'todo'` |
| In Progress | 進行中 | `'in-progress'` |
| Done | 完了 | `'done'` |
| High | 高 | `'high'` |
| Medium | 中 | `'medium'` |
| Low | 低 | `'low'` |
| Filter | フィルタ | `filter` |
| Search | 検索 | `search` |
| Stats | 統計 | `stats` |
| Completion Rate | 完了率 | `completionRate` |
| Estimated Priority | 推定優先度 | `estimatedPriority` |
| Auto Priority | 自動優先度 | `autoPriority` |

## コード上の命名規則

### ステータス

```typescript
// ✅ コード内
type TaskStatus = 'todo' | 'in-progress' | 'done'

// ✅ 表示
'Todo' / '未着手'
'In Progress' / '進行中'
'Done' / '完了'

// ❌ 避ける
'TODO', 'in_progress', 'DONE'
```

### 優先度

```typescript
// ✅ コード内
type TaskPriority = 'high' | 'medium' | 'low'

// ✅ 表示
'High' / '高'
'Medium' / '中'
'Low' / '低'

// ❌ 避ける
'HIGH', 'med', 'l'
```

### コマンド名

```typescript
// ✅ コマンド名（小文字、ハイフン区切り）
'devtask add'
'devtask list'
'devtask auto-priority'

// ❌ 避ける
'devtask Add', 'devtask list_tasks', 'devtask autoPriority'
```

### オプション名

```typescript
// ✅ オプション名（小文字、ハイフン区切り）
--status=todo
--priority=high
--auto-priority

// ❌ 避ける
--Status, --priority_high, --autoPriority
```

### ファイル名

```typescript
// ✅ サービス（PascalCase）
'TaskManager.ts'
'PriorityEstimator.ts'

// ✅ コマンド・型・ユーティリティ（camelCase）
'add.ts'
'task.ts'
'validation.ts'

// ❌ 避ける
'task_manager.ts', 'Add.ts', 'TASK.ts'
```

### ディレクトリ名

```typescript
// ✅ ディレクトリ名（小文字、ハイフン区切り）
'src/cli/commands/'
'src/services/'
'.devtask/'

// ❌ 避ける
'src/CLI/', 'src/Services/', '.devTask/'
```

## 略語

| 略語 | 正式名称 | 意味 |
|------|----------|------|
| CLI | Command Line Interface | コマンドラインインターフェース |
| UUID | Universally Unique Identifier | 汎用一意識別子 |
| JSON | JavaScript Object Notation | JavaScript Object記法 |
| API | Application Programming Interface | アプリケーションプログラミングインターフェース |
| CRUD | Create, Read, Update, Delete | 作成、読み取り、更新、削除 |
| MVP | Minimum Viable Product | 最小限の実用可能な製品 |
| UX | User Experience | ユーザー体験 |
| UI | User Interface | ユーザーインターフェース |

## 用語使用のベストプラクティス

### コード内

- **型名**: PascalCase（例: `Task`, `TaskManager`）
- **変数・関数名**: camelCase（例: `taskList`, `createTask`）
- **定数**: UPPER_SNAKE_CASE（例: `MAX_TITLE_LENGTH`）
- **列挙値**: 小文字のリテラル（例: `'todo'`, `'high'`）

### ドキュメント内

- **見出し**: 英語（例: `## Task Management`）
- **本文**: 日本語と英語を併記（例: Task（タスク））
- **コード例**: 英語（変数名等）

### ユーザー向け表示

- **UIラベル**: 日本語（例: "タスクを追加"）
- **エラーメッセージ**: 日本語（例: "タスクが見つかりません"）
- **ヘルプメッセージ**: 日本語と英語（例: "Usage / 使い方"）

## まとめ

本ユビキタス言語定義により、以下が実現されます：

1. **共通理解**: チーム全体で用語の意味を統一
2. **コミュニケーション**: ドキュメント、コード、会話で一貫した用語使用
3. **保守性**: 用語の定義が明確で、コードが理解しやすい
4. **拡張性**: 新しい用語を追加する際の指針

開発者はこの用語定義を参照し、一貫した用語を使用することで、
プロジェクトの品質と生産性を向上させることができます。
