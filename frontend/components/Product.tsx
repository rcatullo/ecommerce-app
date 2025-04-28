import { useEffect, useState } from 'react';
import api from '../services/api';
import Link from 'next/link';
import { User } from './User';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    user_id: number;
}

const ProductCard: React.FC<Product> = (p) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        api.get<User | null>(`/products/users/${p.id}`)
           .then(res => setUser(res.data))
           .catch(console.error);
    }, [p.id]);

    return(
        <div>
        {user && (
        <>
            <Link key={p.id} href={`/${user.username}`} className="block rounded-2xl group border hover:scale-105 transition-transform duration-700 ease-in-out border-zinc-800 min-h-full bg-white/80 px-8 h-36 flex flex-col justify-center">
                <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg mb-4"></div>
                <h3 className="text-lg font-medium">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.description}</p>
                <p className="mt-2 text-lg font-semibold">${Number(p.price).toFixed(2)}</p>
            </Link>
        </>
        )}
        </div>
    );
};

export default ProductCard;