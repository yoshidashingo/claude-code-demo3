/** 商品カテゴリ */
export type Category = 'wagashi' | 'yogashi' | 'seasoning' | 'beverage' | 'processed';

/** カテゴリフィルター（"all" を含む） */
export type CategoryFilter = Category | 'all';

/** カテゴリラベル */
export interface CategoryLabel {
  value: CategoryFilter;
  label: string;
}

/** 商品 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  stock: number;
}

/** カート内商品 */
export interface CartItem {
  product: Product;
  quantity: number;
}
