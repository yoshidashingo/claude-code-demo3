# 開発ガイドライン

## コーディング規約

### TypeScript
- `strict` モードを有効化
- `any` 型の使用禁止
- 明示的な型定義を推奨（型推論で十分な場合は省略可）
- インターフェースよりも `type` を優先

### React
- 関数コンポーネントのみ使用（クラスコンポーネント不可）
- React Hooks を活用
- コンポーネントは `export function` で公開
- Props は型定義を明示

## 命名規則

| 対象 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `TaskItem`, `TaskList` |
| ファイル（コンポーネント） | PascalCase.tsx | `TaskItem.tsx` |
| ファイル（フック） | camelCase.ts | `useLocalStorage.ts` |
| ファイル（型定義） | camelCase.ts | `task.ts` |
| 関数 | camelCase | `addTask`, `toggleTask` |
| 変数 | camelCase | `taskList`, `isEditing` |
| 定数 | UPPER_SNAKE_CASE | `STORAGE_KEY` |
| 型/インターフェース | PascalCase | `Task`, `FilterType` |
| Context | PascalCase + Context | `TaskContext` |
| Hook | use + PascalCase | `useLocalStorage` |

## スタイリング規約

### Tailwind CSS
- ユーティリティクラスを直接使用
- カスタムCSSは最小限に
- レスポンシブデザインは `sm:`, `md:`, `lg:` プレフィックスを使用
- ダークモードは `dark:` プレフィックスで対応（将来対応）

### カラーパレット
- プライマリ: `blue-500` / `blue-600`
- 背景: `gray-50` / `white`
- テキスト: `gray-900` / `gray-600`
- ボーダー: `gray-200` / `gray-300`
- 危険: `red-500` / `red-600`
- 成功: `green-500`

## テスト規約

- 将来的にVitest + React Testing Libraryを導入予定
- コンポーネントテストとフックテストを実装予定

## Git規約

### ブランチ命名
- `main`: 本番ブランチ
- `feature/[機能名]`: 機能開発
- `fix/[バグ名]`: バグ修正
- `docs/[内容]`: ドキュメント

### コミットメッセージ
```
<type>: <description>

<body>(optional)
```

**type:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: スタイル変更
- `refactor`: リファクタリング
- `chore`: その他の変更
