import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get<Product[]>('/products')
       .then(res => setProducts(res.data))
       .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Ocean Blue</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Discover our curated collection of premium products</p>
            <div className="space-x-4">
              <Link href="/login" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
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
              <div className="text-blue-600 text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Carefully selected products meeting our high standards</p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $50</p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">💫</div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
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
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  <p className="mt-2 text-lg font-semibold text-blue-600">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600">We'd love to hear from you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-blue-600">support@oceanblue.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-blue-600">1-800-OCEAN-BLUE</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Ocean Avenue<br />Seaside, CA 90210</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ocean Blue</h3>
              <p className="text-blue-200">Your premium shopping destination</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-blue-200 hover:text-white">About Us</Link></li>
                <li><Link href="/products" className="text-blue-200 hover:text-white">Products</Link></li>
                <li><Link href="/contact" className="text-blue-200 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-blue-200 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-blue-200 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white">Twitter</a>
                <a href="#" className="text-blue-200 hover:text-white">Facebook</a>
                <a href="#" className="text-blue-200 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
