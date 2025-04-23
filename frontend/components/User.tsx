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
    is_verified: boolean;
}

const UserListings: React.FC<User> = (user) => {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        api.get<Product[]>(`/users/${user.id}`)
           .then(res => setProducts(res.data))
           .catch(console.error);
      }, []);
    
      return(<>{products && products.map(p => (<ProductCard key={p.id} {...p} />))}</>);
};

export default UserListings;