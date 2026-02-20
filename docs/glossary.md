# ユビキタス言語定義

## 1. ドメイン用語

| 日本語 | 英語 | コード上の表記 | 説明 |
|--------|------|----------------|------|
| 商品 | Product | `product` | ECサイトで販売される食品・グルメ商品 |
| カート | Cart | `cart` | 購入予定の商品を一時的に保管する場所 |
| カートアイテム | Cart Item | `cartItem` | カート内の個別商品（商品＋数量） |
| お気に入り | Favorites | `favorites` | ユーザーがブックマークした商品リスト |
| カテゴリ | Category | `category` | 商品の分類（和菓子、洋菓子など） |
| 在庫 | Stock | `stock` | 商品の在庫数 |
| 数量 | Quantity | `quantity` | カート内の商品数量 |
| 価格 | Price | `price` | 商品の単価 |
| 小計 | Subtotal | `subtotal` | 個別商品の価格 × 数量 |
| 合計 | Total | `total` | カート内全商品の合計金額 |

## 2. カテゴリ用語

| 日本語 | 英語（コード値） | 説明 |
|--------|------------------|------|
| 和菓子 | `wagashi` | 日本の伝統的な菓子 |
| 洋菓子 | `yogashi` | 西洋風の菓子 |
| 調味料 | `seasoning` | 料理に使用する調味料 |
| 飲料 | `beverage` | 飲み物全般 |
| 加工食品 | `processed` | 加工された食品 |

## 3. UI/UX用語

| 日本語 | 英語 | コード上の表記 | 説明 |
|--------|------|----------------|------|
| 商品一覧 | Product List | `ProductList` | 商品をカード形式で表示する画面 |
| 商品詳細 | Product Detail | `ProductDetail` | 個別商品の詳細情報画面 |
| 商品カード | Product Card | `ProductCard` | 一覧で表示される個別商品のカード |
| カテゴリフィルター | Category Filter | `CategoryFilter` | カテゴリで商品を絞り込むUI |
| カート一覧 | Cart Item List | `CartItemList` | カート内商品のリスト表示 |
| カートサマリー | Cart Summary | `CartSummary` | 合計金額の表示エリア |
| お気に入り一覧 | Favorite List | `FavoriteList` | お気に入り商品のリスト表示 |
| ヘッダー | Header | `Header` | ページ上部のナビゲーション |
| フッター | Footer | `Footer` | ページ下部のコピーライト |
| バッジ | Badge | - | アイコンに付く数値表示（カート数、お気に入り数） |

## 4. アクション用語

| 日本語 | 英語 | コード上の表記 | 説明 |
|--------|------|----------------|------|
| カートに追加 | Add to Cart | `addToCart` | 商品をカートに追加する操作 |
| カートから削除 | Remove from Cart | `removeFromCart` | 商品をカートから削除する操作 |
| 数量変更 | Update Quantity | `updateQuantity` | カート内商品の数量を変更する操作 |
| カートを空にする | Clear Cart | `clearCart` | カート内の全商品を削除する操作 |
| お気に入り切替 | Toggle Favorite | `toggleFavorite` | お気に入りの追加/解除をトグルする操作 |
| お気に入り判定 | Is Favorite | `isFavorite` | 商品がお気に入りに登録済みか判定 |

## 5. 状態用語

| 日本語 | 英語 | 説明 |
|--------|------|------|
| 在庫あり | In Stock | `stock > 0` |
| 在庫なし | Out of Stock | `stock === 0` |
| お気に入り済み | Favorited | お気に入りリストに含まれている状態 |
| カート内 | In Cart | カートに追加されている状態 |
