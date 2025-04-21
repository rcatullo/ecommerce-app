import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '../services/api';
import { Product } from '../types/types';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get<Product[]>('/products')
       .then(res => setProducts(res.data))
       .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#8C1515] to-[#B83A3A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to FarmSale</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">Stanford's Marketplace for Graduating Seniors</p>
            <div className="space-x-4">
              <Link href="/login" className="bg-white text-[#8C1515] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Login with SUNet ID
              </Link>
              <Link href="/signup" className="bg-[#585858] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#404040] transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-[#8C1515] text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Stanford Community</h3>
              <p className="text-gray-600">Exclusive marketplace for Stanford seniors</p>
            </div>
            <div className="text-center p-6">
              <div className="text-[#8C1515] text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Local Pickup</h3>
              <p className="text-gray-600">Easy on-campus exchange</p>
            </div>
            <div className="text-center p-6">
              <div className="text-[#8C1515] text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Student Prices</h3>
              <p className="text-gray-600">Fair prices for the Stanford community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#8C1515] mb-8 text-center">Recent Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (
              <Link 
                href={`/products/${p.id}`}
                key={p.id}
                className="block group"
              >
                <div className="bg-white rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg mb-4">
                    {/* Add product image here */}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#8C1515]">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  <p className="mt-2 text-lg font-semibold text-[#8C1515]">
                    ${Number(p.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8C1515] mb-4">Questions?</h2>
            <p className="text-gray-600">We're here to help</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-[#8C1515]">farmsale@stanford.edu</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">Tresidder Memorial Union<br />459 Lagunita Dr, Stanford, CA</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Discord</h3>
              <p className="text-[#8C1515]">Join our community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8C1515] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FarmSale</h3>
              <p className="text-gray-200">Stanford's Student Marketplace</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-200 hover:text-white">About Us</Link></li>
                <li><Link href="/products" className="text-gray-200 hover:text-white">Browse Items</Link></li>
                <li><Link href="/sell" className="text-gray-200 hover:text-white">List Item</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Policies</h3>
              <ul className="space-y-2">
                <li><Link href="/guidelines" className="text-gray-200 hover:text-white">Community Guidelines</Link></li>
                <li><Link href="/terms" className="text-gray-200 hover:text-white">Terms of Use</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-200 hover:text-white">Discord</a>
                <a href="#" className="text-gray-200 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
