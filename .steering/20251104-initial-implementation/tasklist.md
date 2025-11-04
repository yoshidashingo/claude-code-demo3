# 初回実装タスクリスト

## フェーズ1: 基盤構築

- [ ] 1-1. プロジェクト構造作成
  - [ ] `src/` ディレクトリ作成
  - [ ] `src/cli/`, `src/services/`, `src/types/`, `src/utils/`, `src/constants/` 作成

- [ ] 1-2. package.json作成
  - [ ] 依存関係定義
  - [ ] スクリプト定義（build, dev, lint）
  - [ ] bin設定

- [ ] 1-3. TypeScript設定
  - [ ] `tsconfig.json` 作成
  - [ ] `tsconfig.build.json` 作成

- [ ] 1-4. ESLint設定
  - [ ] `eslint.config.js` 作成

- [ ] 1-5. Prettier設定
  - [ ] `.prettierrc` 作成
  - [ ] `.prettierignore` 作成

- [ ] 1-6. .gitignore作成

## フェーズ2: 型定義・定数

- [ ] 2-1. 型定義作成 (`src/types/`)
  - [ ] `task.ts` - Task, TaskStatus, TaskPriority, StatusChange
  - [ ] `config.ts` - Config
  - [ ] `filter.ts` - FilterOptions
  - [ ] `stats.ts` - TaskStats, PriorityScore
  - [ ] `index.ts` - バレルエクスポート

- [ ] 2-2. 定数定義作成 (`src/constants/`)
  - [ ] `taskStatus.ts` - STATUS定数
  - [ ] `taskPriority.ts` - PRIORITY定数
  - [ ] `paths.ts` - ファイルパス定数
  - [ ] `messages.ts` - メッセージ定数
  - [ ] `index.ts` - バレルエクスポート

## フェーズ3: ユーティリティ

- [ ] 3-1. バリデーション (`src/utils/validation.ts`)
  - [ ] `validateTitle()` - タイトルバリデーション
  - [ ] `validateDescription()` - 説明バリデーション
  - [ ] `validateStatus()` - ステータスバリデーション
  - [ ] `validatePriority()` - 優先度バリデーション

- [ ] 3-2. 日付フォーマット (`src/utils/dateFormat.ts`)
  - [ ] `formatDate()` - 日付フォーマット
  - [ ] `formatRelative()` - 相対日時表示

- [ ] 3-3. ファイルヘルパー (`src/utils/fileHelpers.ts`)
  - [ ] `findDevtaskDir()` - .devtaskディレクトリ探索
  - [ ] `ensureDir()` - ディレクトリ確認・作成

## フェーズ4: データレイヤー

- [ ] 4-1. FileStorage実装 (`src/services/FileStorage.ts`)
  - [ ] コンストラクタ
  - [ ] `ensureDevtaskDir()` - ディレクトリ確認
  - [ ] `loadTasks()` - タスク読み込み
  - [ ] `saveTasks()` - タスク保存
  - [ ] `loadConfig()` - 設定読み込み
  - [ ] `saveConfig()` - 設定保存
  - [ ] `initialize()` - プロジェクト初期化

## フェーズ5: サービスレイヤー

- [ ] 5-1. TaskManager実装 (`src/services/TaskManager.ts`)
  - [ ] コンストラクタ
  - [ ] `createTask()` - タスク作成
  - [ ] `getTasks()` - タスク一覧取得（フィルタ対応）
  - [ ] `getTaskById()` - タスク詳細取得
  - [ ] `updateTask()` - タスク更新
  - [ ] `deleteTask()` - タスク削除
  - [ ] `changeStatus()` - ステータス変更
  - [ ] `changePriority()` - 優先度変更
  - [ ] `getStats()` - 統計情報取得
  - [ ] `estimatePriorities()` - 優先度推定適用

- [ ] 5-2. PriorityEstimator実装 (`src/services/PriorityEstimator.ts`)
  - [ ] `estimate()` - 優先度推定
  - [ ] `calculateDueDateScore()` - 期限スコア計算
  - [ ] `calculateAgeScore()` - 経過時間スコア計算
  - [ ] `calculateStatusScore()` - ステータススコア計算
  - [ ] `calculateTotalScore()` - 総合スコア計算

## フェーズ6: UI表示

- [ ] 6-1. カラー定義 (`src/cli/ui/colors.ts`)
  - [ ] ステータス色定義
  - [ ] 優先度色定義
  - [ ] エラー・成功メッセージ色定義

- [ ] 6-2. テーブル表示 (`src/cli/ui/table.ts`)
  - [ ] `renderTaskTable()` - タスク一覧テーブル表示
  - [ ] `renderStatsTable()` - 統計情報テーブル表示

- [ ] 6-3. プロンプト (`src/cli/ui/prompts.ts`)
  - [ ] `confirmDelete()` - 削除確認プロンプト
  - [ ] `editTaskPrompt()` - タスク編集プロンプト

## フェーズ7: CLIコマンド

- [ ] 7-1. CLI基本構造 (`src/cli/index.ts`)
  - [ ] Commander.js セットアップ
  - [ ] グローバルオプション（--version, --help）
  - [ ] エラーハンドリング

- [ ] 7-2. initコマンド (`src/cli/commands/init.ts`)
  - [ ] プロジェクト初期化処理
  - [ ] プロジェクト名入力
  - [ ] .gitignore更新（オプション）

- [ ] 7-3. addコマンド (`src/cli/commands/add.ts`)
  - [ ] タスク作成処理
  - [ ] オプション処理（-d, -p, -s, --due）
  - [ ] バリデーション
  - [ ] 成功メッセージ表示

- [ ] 7-4. listコマンド (`src/cli/commands/list.ts`)
  - [ ] タスク一覧取得
  - [ ] フィルタ処理（--status, --priority, --search）
  - [ ] 優先度自動推定（--auto-priority）
  - [ ] テーブル表示
  - [ ] 統計情報表示

- [ ] 7-5. showコマンド (`src/cli/commands/show.ts`)
  - [ ] タスク詳細取得
  - [ ] 詳細情報表示

- [ ] 7-6. editコマンド (`src/cli/commands/edit.ts`)
  - [ ] タスク更新処理
  - [ ] オプション処理
  - [ ] インタラクティブモード
  - [ ] 成功メッセージ表示

- [ ] 7-7. deleteコマンド (`src/cli/commands/delete.ts`)
  - [ ] 削除確認プロンプト
  - [ ] タスク削除処理
  - [ ] 成功メッセージ表示

- [ ] 7-8. statusコマンド (`src/cli/commands/status.ts`)
  - [ ] ステータス変更処理
  - [ ] エイリアス実装（start, done）
  - [ ] 成功メッセージ表示

- [ ] 7-9. priorityコマンド (`src/cli/commands/priority.ts`)
  - [ ] 優先度変更処理
  - [ ] 成功メッセージ表示

- [ ] 7-10. statsコマンド (`src/cli/commands/stats.ts`)
  - [ ] 統計情報取得
  - [ ] テーブル表示

- [ ] 7-11. コマンドバレルエクスポート (`src/cli/commands/index.ts`)

## フェーズ8: エントリーポイント

- [ ] 8-1. パッケージエントリーポイント (`src/index.ts`)
  - [ ] CLIエクスポート

- [ ] 8-2. CLI実行可能設定
  - [ ] shebang追加 (`#!/usr/bin/env node`)
  - [ ] 実行権限設定

## フェーズ9: ビルド・テスト

- [ ] 9-1. TypeScriptビルド
  - [ ] `npm run build` 実行
  - [ ] `dist/` ディレクトリ確認

- [ ] 9-2. 型チェック
  - [ ] `npx tsc --noEmit` 実行
  - [ ] エラー修正

- [ ] 9-3. ESLintチェック
  - [ ] `npm run lint` 実行
  - [ ] エラー・警告修正

## フェーズ10: 動作確認

- [ ] 10-1. プロジェクト初期化テスト
  - [ ] `devtask init` 実行
  - [ ] `.devtask/` ディレクトリ作成確認
  - [ ] `config.json`, `tasks.json` 確認

- [ ] 10-2. タスク作成テスト
  - [ ] `devtask add "テストタスク"` 実行
  - [ ] タスクが作成されることを確認

- [ ] 10-3. タスク一覧テスト
  - [ ] `devtask list` 実行
  - [ ] テーブル表示確認
  - [ ] フィルタ動作確認（--status, --priority, --search）

- [ ] 10-4. 優先度自動推定テスト
  - [ ] `devtask list --auto-priority` 実行
  - [ ] 推定優先度が表示されることを確認
  - [ ] スコアリングの妥当性確認

- [ ] 10-5. ステータス変更テスト
  - [ ] `devtask start <id>` 実行
  - [ ] ステータスが変更されることを確認
  - [ ] `devtask done <id>` 実行

- [ ] 10-6. タスク編集テスト
  - [ ] `devtask edit <id> -p high` 実行
  - [ ] タスクが更新されることを確認

- [ ] 10-7. タスク削除テスト
  - [ ] `devtask delete <id>` 実行
  - [ ] 確認プロンプト表示確認
  - [ ] タスクが削除されることを確認

- [ ] 10-8. 統計情報テスト
  - [ ] `devtask stats` 実行
  - [ ] 統計情報が正しく表示されることを確認

- [ ] 10-9. エラーハンドリングテスト
  - [ ] 存在しないタスクIDで各コマンド実行
  - [ ] 適切なエラーメッセージ表示確認

- [ ] 10-10. ヘルプメッセージテスト
  - [ ] `devtask --help` 実行
  - [ ] `devtask <command> --help` 実行
  - [ ] ヘルプメッセージ確認

## フェーズ11: ドキュメント

- [ ] 11-1. README.md更新
  - [ ] インストール方法
  - [ ] 基本的な使い方
  - [ ] コマンド一覧
  - [ ] 例

- [ ] 11-2. package.json更新
  - [ ] description
  - [ ] keywords
  - [ ] repository
  - [ ] author
  - [ ] license

## 完了条件

すべてのタスクが完了し、以下が満たされていること：

- [ ] TypeScript型チェックが通る
- [ ] ESLintチェックが通る
- [ ] すべてのMVP機能が動作する
- [ ] エラーハンドリングが適切
- [ ] ヘルプメッセージが充実
- [ ] README.mdが完備

## 推定工数

- フェーズ1-3: 1-2時間
- フェーズ4-5: 2-3時間
- フェーズ6-7: 3-4時間
- フェーズ8-10: 1-2時間
- フェーズ11: 1時間

**合計: 8-12時間**
