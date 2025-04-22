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
    const [user, setUser] = useState<User>();

    useEffect(() => {
        api.get<User>(`/products/users/${p.id}`)
           .then(res => setUser(res.data))
           .catch(console.error);
    }, []);

    return(
        <div>
        {user && (
        <>
            <Link key={p.id} href={`/${user.username}`} className="block group bg-white dark:bg-gray-700 rounded-xl p-6 transition-shadow hover:shadow-lg">
                <div className="aspect-w-1 aspect-h-1 bg-gray-100 dark:bg-gray-600 rounded-lg mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#8C1515]">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{p.description}</p>
                <p className="mt-2 text-lg font-semibold text-[#8C1515] dark:text-red-300">${Number(p.price).toFixed(2)}</p>
            </Link>
        </>
        )}
        </div>
    );
};

export default ProductCard;