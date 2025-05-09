/**
 * pages/index.tsx
 *
 * HomePage component for the Treesail/Thrift at Stanford application.
 * Fetches and displays a list of products from the API, renders the main hero section,
 * and shows animated, infinitely-scrolling product cards.
 * Includes Header and Footer components.
 */

"use client";

import { useEffect, useState } from 'react';
import api from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/components/Product';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

/**
 * HomePage Component
 *
 * Fetches product listings and displays them in animated scrollers.
 * Renders the main landing/hero section and includes site header and footer.
 */
const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get<Product[]>('/products')
       .then(res => setProducts(res.data))
       .catch(console.error);
  }, []);

  return (
    <>
    <div className="relative bg-white">
      <div className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] sm:bg-linear-145"></div>
      <div className='relative px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-7xl'>
      <Header />
      <main className="">
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className='font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]'>
            <span className="font-unifraktur">Thrift</span> at Stanford
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">Join the campus-wide garage sale. </p>
        </div>
      </main>
      </div>
      </div>
    </div>
    <main>
      <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
    <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <div className="pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <h2 className="max-w-3xl text-4xl font-medium tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-6xl">Hundreds of listings by graduating seniors.</h2>
          <div className="mt-16">
      <InfiniteMovingCards
        items={products}
        direction="right"
        speed="slow"
        pauseOnHover={false}
      />
      <InfiniteMovingCards
        items={products}
        direction="left"
        speed="slow"
        pauseOnHover={false}
      />
      </div>
      </div>
      </div>
    </div>
    </div>
    </main>
    <Footer />
    </>
    
  );
};

export default HomePage;