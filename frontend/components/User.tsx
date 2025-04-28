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

interface UserListingsProps {
  products: Product[];
}

const UserListings: React.FC<UserListingsProps> = ({ products }) => (
  <>{products && products.map(p => (<ProductCard key={p.id} {...p} />))}</>
);

export default UserListings;