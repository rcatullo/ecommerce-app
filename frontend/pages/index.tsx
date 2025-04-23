import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../services/api';
import Header from '../components/Header';
import ProductCard, { Product } from '../components/Product';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get<Product[]>('/products')
       .then(res => setProducts(res.data))
       .catch(console.error);
  }, []);

  return (
    <>
    <div className="relative">
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
    {/* Products Section 
    <section>
          <h2 className="text-3xl font-bold text-[#8C1515] mb-8 text-center">Recent Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (<ProductCard key={p.id} {...p} />))}
          </div>
        </section>*/}
    </>
    
  );
};

export default HomePage;