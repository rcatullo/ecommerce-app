import { createContext, useContext, ReactNode, useState } from 'react';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (storeName: string) => Promise<void>;
  addProduct: (storeName: string, product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (storeName: string, productId: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (storeName: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/sellers/${storeName}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error('fetchProducts error:', err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (storeName: string, product: Omit<Product, 'id'>) => {
    try {
      const response = await api.post(`/sellers/${storeName}/products`, product);
      setProducts([...products, response.data]);
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const deleteProduct = async (storeName: string, productId: number) => {
    try {
      await api.delete(`/sellers/${storeName}/products/${productId}`);
      setProducts(products.filter(p => p.id !== productId));
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      error, 
      fetchProducts, 
      addProduct, 
      deleteProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
