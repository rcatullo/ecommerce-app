import { useEffect, useState } from 'react';
import api from '../services/api';
import Link from 'next/link';
import ProductCard, { Product } from './Product';
import Header from './Header';

export interface User {
    id: number;
    username: string;
    email: string;
    is_seller: boolean;
}

const UserListings: React.FC<User> = (user) => {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        api.get<Product[]>(`/users/${user.id}`)
           .then(res => setProducts(res.data))
           .catch(console.error);
      }, []);
    
      return(
        <section>
        <h2 className="text-3xl font-bold text-[#8C1515] mb-8 text-center">Listings by {user.username}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products && products.map(p => (<ProductCard key={p.id} {...p} />))}
        </div>
        </section>
      );
};

export default UserListings;