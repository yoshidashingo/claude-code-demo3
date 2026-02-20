import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductDetail from '../components/product/ProductDetail';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">商品が見つかりませんでした。</p>
        <Link
          to="/"
          className="mt-4 inline-block text-amber-600 hover:text-amber-700 transition-colors"
        >
          ← 商品一覧に戻る
        </Link>
      </div>
    );
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
