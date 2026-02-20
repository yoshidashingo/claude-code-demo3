/**
 * 価格を日本円形式にフォーマットする
 */
export const formatPrice = (price: number): string => {
  return `¥${price.toLocaleString('ja-JP')}`;
};
