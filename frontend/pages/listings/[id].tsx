import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Product } from '../../components/Product';

const ProductDetail: React.FC = () => {
  const { query } = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (query.id) {
      api.get<Product>(`/products/${query.id}`)
         .then(res => setProduct(res.data))
         .catch(console.error);
    }
  }, [query.id]);

  if (!product) return <p>Loading…</p>;
  return (
    <section>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <strong>${Number(product.price).toFixed(2)}</strong>
    </section>
  );
};

export default ProductDetail;
