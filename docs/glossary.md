# ユビキタス言語定義

## 1. ドメイン用語

| 日本語 | 英語 | 説明 |
|--------|------|------|
| 商品 | Product | 販売する食品・グルメアイテム |
| カート | Cart | 購入予定商品を一時保管する場所 |
| お気に入り | Favorites | 後で購入を検討する商品リスト |
| カテゴリ | Category | 商品の分類（和菓子、洋菓子など） |
| 在庫 | Stock | 販売可能な商品数 |
| 数量 | Quantity | カート内の商品個数 |

## 2. カテゴリ用語

| 日本語 | 英語ID | 説明 |
|--------|--------|------|
| 和菓子 | wagashi | 日本の伝統的な菓子 |
| 洋菓子 | yogashi | 西洋風の菓子 |
| 調味料 | seasoning | 料理に使う調味料 |
| 飲料 | beverage | 飲み物類 |
| 加工食品 | processed | 加工された食品類 |

## 3. UI/UX用語

| 日本語 | 英語 | 説明 |
|--------|------|------|
| 商品一覧 | Product List | 商品をカード形式で表示する画面 |
| 商品詳細 | Product Detail | 商品の詳細情報を表示する画面 |
| カートに追加 | Add to Cart | 商品をカートに入れる操作 |
| お気に入りに追加 | Add to Favorites | 商品をお気に入りに登録する操作 |
| 商品カード | Product Card | 商品情報を表示するカード型UI |

## 4. アクション用語

| 日本語 | 英語 | コード内表現 |
|--------|------|--------------|
| 追加する | Add | add, addTo |
| 削除する | Remove | remove, removeFrom |
| 更新する | Update | update, set |
| クリアする | Clear | clear, reset |
| 切り替える | Toggle | toggle |

## 5. 状態用語

| 日本語 | 英語 | 説明 |
|--------|------|------|
| 在庫あり | In Stock | 購入可能な状態 |
| 在庫切れ | Out of Stock | 在庫がない状態 |
| お気に入り済み | Favorited | お気に入りに登録済み |
| カート内 | In Cart | カートに追加済み |

## 6. コード命名規則

### 6.1 変数名
| 概念 | 変数名 |
|------|--------|
| 商品リスト | products |
| カート内商品 | cartItems |
| お気に入り商品 | favorites |
| 選択カテゴリ | selectedCategory |
| 合計金額 | totalPrice |
| 合計数量 | totalItems |

### 6.2 関数名
| 操作 | 関数名 |
|------|--------|
| カートに追加 | addToCart |
| カートから削除 | removeFromCart |
| 数量更新 | updateQuantity |
| お気に入りに追加 | addToFavorites |
| お気に入りから削除 | removeFromFavorites |
| お気に入り判定 | isFavorite |

### 6.3 コンポーネント名
| 役割 | コンポーネント名 |
|------|------------------|
| ヘッダー | Header |
| フッター | Footer |
| 商品カード | ProductCard |
| 商品一覧 | ProductList |
| 商品詳細 | ProductDetail |
| カート | Cart |
| カート項目 | CartItem |
| お気に入り一覧 | Favorites |
