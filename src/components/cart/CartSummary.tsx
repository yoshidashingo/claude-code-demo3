import { formatPrice } from '../../utils/format';

interface CartSummaryProps {
  totalCount: number;
  totalPrice: number;
}

const CartSummary = ({ totalCount, totalPrice }: CartSummaryProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800">注文サマリー</h2>
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>商品数</span>
        <span>{totalCount}点</span>
      </div>
      <div className="mt-4 border-t pt-4 flex justify-between">
        <span className="text-lg font-bold text-gray-800">合計</span>
        <span className="text-lg font-bold text-amber-700">{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
