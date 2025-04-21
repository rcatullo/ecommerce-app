import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../services/api';
import Header from '../components/Header';
import { Product } from '../types/types';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get<Product[]>('/products')
       .then(res => setProducts(res.data))
       .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#8C1515] to-[#B83A3A] text-white rounded-xl p-10 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Welcome to FarmSale</h1>
          <p className="text-xl md:text-2xl mb-6 text-center">Stanford's Marketplace for Graduating Seniors</p>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-3xl font-bold text-[#8C1515] mb-8 text-center">Recent Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (
              <Link key={p.id} href={`/listings/${p.id}`} className="block group bg-white dark:bg-gray-700 rounded-xl p-6 transition-shadow hover:shadow-lg">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-100 dark:bg-gray-600 rounded-lg mb-4"></div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#8C1515]">{p.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{p.description}</p>
                  <p className="mt-2 text-lg font-semibold text-[#8C1515] dark:text-red-300">${Number(p.price).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;