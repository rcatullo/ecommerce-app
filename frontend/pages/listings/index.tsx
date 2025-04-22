import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Product } from '../../components/Product';

const ListingsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Product[]>('/products')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-16 text-lg">Loading listings…</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#8C1515] mb-8 text-center">All Listings</h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <Link
              href={`/listings/${product.id}`}
              key={product.id}
              className="block group"
            >
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex flex-col h-full">
                <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                </div>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#8C1515] mb-1">{product.name}</h2>
                <p className="text-[#8C1515] font-bold mb-2">${Number(product.price).toFixed(2)}</p>
                <p className="text-gray-600 text-sm line-clamp-2 flex-grow">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default ListingsPage;
