# 技術仕様書

## 1. テクノロジースタック

### 1.1 フロントエンド
| カテゴリ | 技術 | バージョン |
|----------|------|------------|
| フレームワーク | React | 18.x |
| 言語 | TypeScript | 5.x |
| ビルドツール | Vite | 5.x |
| スタイリング | Tailwind CSS | 3.x |
| ルーティング | React Router | 6.x |

### 1.2 状態管理
- React Context API（グローバル状態）
- useState / useReducer（ローカル状態）

### 1.3 ユーティリティ
| ライブラリ | 用途 |
|------------|------|
| uuid | 一意なID生成 |
| date-fns | 日付処理 |

## 2. アーキテクチャパターン

### 2.1 コンポーネント設計
- **Presentational / Container パターン**
  - UIコンポーネントはプレゼンテーション層
  - ページコンポーネントがロジックを持つ

### 2.2 ディレクトリ構造
```
src/
├── components/    # 再利用可能なUIコンポーネント
├── contexts/      # グローバル状態管理
├── hooks/         # カスタムフック
├── types/         # TypeScript型定義
├── data/          # モックデータ
├── pages/         # ページコンポーネント
├── utils/         # ユーティリティ関数
└── constants/     # 定数
```

## 3. 開発環境

### 3.1 Node.js
- バージョン: 18.x 以上

### 3.2 パッケージマネージャー
- npm

### 3.3 開発サーバー
- Vite開発サーバー（HMR対応）
- ポート: 5173（デフォルト）

## 4. ビルド設定

### 4.1 Vite設定
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### 4.2 TypeScript設定
- strict mode有効
- ESNext target
- React JSX transform

## 5. パフォーマンス最適化

### 5.1 画像
- 適切なサイズの画像を使用
- 遅延読み込み（lazy loading）

### 5.2 バンドル
- コード分割（React.lazy）
- Tree shaking

## 6. セキュリティ考慮事項

### 6.1 XSS対策
- Reactの自動エスケープを活用
- dangerouslySetInnerHTMLは使用しない

### 6.2 入力バリデーション
- 数量入力の範囲チェック
- 不正な値の排除
