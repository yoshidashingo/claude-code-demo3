# Devtask - Testing Guide

このドキュメントでは、Devtaskの動作確認方法を説明します。

## ビルド確認

```bash
# ビルド
npm run build

# Lintチェック
npm run lint

# フォーマット
npm run format
```

## CLIテスト

### 1. プロジェクト初期化

```bash
# テスト用ディレクトリを作成
mkdir test-project
cd test-project

# Devtaskプロジェクトを初期化
node ../dist/cli/index.js init
# プロジェクト名を入力 (例: "My Test Project")
```

### 2. タスク追加

```bash
# インタラクティブモードでタスク追加
node ../dist/cli/index.js add

# コマンドラインオプションでタスク追加
node ../dist/cli/index.js add -t "APIエンドポイント実装" -d "ユーザー認証APIを実装する" -p high --due 2024-12-31
```

### 3. タスク一覧表示

```bash
# 全タスク表示
node ../dist/cli/index.js list

# ステータスでフィルタ
node ../dist/cli/index.js list -s todo

# 優先度でフィルタ
node ../dist/cli/index.js list -p high

# キーワード検索
node ../dist/cli/index.js list --search "API"
```

### 4. タスク詳細表示

```bash
# IDの最初の数文字で検索可能
node ../dist/cli/index.js show abc123
```

### 5. タスク編集

```bash
# インタラクティブモードで編集
node ../dist/cli/index.js edit abc123
```

### 6. ステータス変更

```bash
# インタラクティブモード
node ../dist/cli/index.js status abc123

# コマンドラインオプション
node ../dist/cli/index.js status abc123 in-progress
```

### 7. 優先度変更

```bash
# インタラクティブモード
node ../dist/cli/index.js priority abc123

# コマンドラインオプション
node ../dist/cli/index.js priority abc123 high
```

### 8. 統計表示

```bash
node ../dist/cli/index.js stats
```

### 9. タスク削除

```bash
# 確認付き削除
node ../dist/cli/index.js delete abc123

# 確認なし削除
node ../dist/cli/index.js delete abc123 -f
```

## 機能確認項目

### MVP機能チェックリスト

- [x] プロジェクト初期化 (`init`)
- [x] タスク追加 (`add`)
  - [x] インタラクティブモード
  - [x] コマンドラインオプション
  - [x] 自動優先度推定
- [x] タスク一覧 (`list`)
  - [x] ステータスフィルタ
  - [x] 優先度フィルタ
  - [x] キーワード検索
- [x] タスク詳細表示 (`show`)
  - [x] 部分ID検索
- [x] タスク編集 (`edit`)
- [x] タスク削除 (`delete`)
  - [x] 確認プロンプト
  - [x] 強制削除オプション
- [x] ステータス変更 (`status`)
  - [x] ステータス履歴記録
  - [x] 推定優先度の再計算
- [x] 優先度変更 (`priority`)
- [x] 統計表示 (`stats`)

### 優先度自動推定機能

優先度は以下の要素から自動的に推定されます：

1. **期限スコア (50%)**
   - 期限超過: 100点
   - 1日以内: 90点
   - 3日以内: 70点
   - 7日以内: 50点
   - 14日以内: 30点
   - それ以降: 10点

2. **タスク経過日数スコア (20%)**
   - 30日以上: 100点
   - 14-30日: 70点
   - 7-14日: 50点
   - 7日未満: 30点

3. **ステータススコア (30%)**
   - 進行中: 100点
   - 未着手: 50点
   - 完了: 0点

総合スコアが70点以上で「高」、40-70点で「中」、40点未満で「低」と判定されます。

## データファイル

プロジェクトを初期化すると、`.devtask/` ディレクトリが作成されます：

```
.devtask/
├── config.json    # プロジェクト設定
└── tasks.json     # タスクデータ
```

### config.json の例

```json
{
  "projectName": "My Project",
  "version": "1.0.0",
  "createdAt": "2024-11-04T12:00:00.000Z",
  "autoPriority": true
}
```

### tasks.json の例

```json
[
  {
    "id": "abc12345-6789-...",
    "title": "APIエンドポイント実装",
    "description": "ユーザー認証APIを実装する",
    "status": "in-progress",
    "priority": "high",
    "estimatedPriority": "high",
    "dueDate": "2024-12-31",
    "createdAt": "2024-11-04T12:00:00.000Z",
    "updatedAt": "2024-11-04T13:00:00.000Z",
    "statusHistory": [
      {
        "from": "todo",
        "to": "in-progress",
        "changedAt": "2024-11-04T13:00:00.000Z"
      }
    ]
  }
]
```

## トラブルシューティング

### ビルドエラー

```bash
# node_modulesを再インストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

### ESLintエラー

```bash
# 自動修正を試す
npm run lint -- --fix
```

### 型エラー

```bash
# TypeScriptの型チェック
npx tsc --noEmit
```

## 次のステップ

MVP実装が完了しました。今後の拡張案：

- P1機能: ファイルベースのバックアップ・リストア
- P2機能: カスタマイズ可能な優先度アルゴリズム
- P3機能: タグ機能、エクスポート/インポート、Git連携
