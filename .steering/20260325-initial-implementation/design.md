# 初回実装 - 設計

## 実装アプローチ
- React Context + useReducer で状態管理
- localStorage カスタムフックでデータ永続化
- Tailwind CSS でスタイリング
- コンポーネント分割は機能設計書に準拠

## コンポーネント構成

### TaskContext（状態管理）
- `useReducer` でタスクの CRUD を管理
- アクション: ADD_TASK, TOGGLE_TASK, DELETE_TASK, EDIT_TASK
- localStorage との自動同期

### UIコンポーネント
- Header: タイトル表示
- TaskInput: 入力フォーム（controlled component）
- TaskFilter: フィルターボタン3つ
- TaskList: フィルター適用後のタスク一覧
- TaskItem: 個別タスク（チェック/編集/削除）
- TaskFooter: 残りタスク数

## データフロー
```
TaskInput → dispatch(ADD_TASK) → Reducer → 新state → UI更新 + localStorage保存
TaskItem → dispatch(TOGGLE/DELETE/EDIT) → Reducer → 新state → UI更新 + localStorage保存
TaskFilter → setFilter → フィルター適用 → TaskList再レンダリング
```
