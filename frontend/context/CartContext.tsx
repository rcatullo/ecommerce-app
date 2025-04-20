import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api';

interface CartItem { id: number; product_id: number; quantity: number; name: string; price: number }
interface CartContextType {
  items: CartItem[];
  addToCart(productId: number, qty: number): Promise<void>;
  loadCart(): Promise<void>;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const loadCart = async () => {
    const res = await api.get<CartItem[]>('/cart');
    setItems(res.data);
  };

  const addToCart = async (productId: number, qty: number) => {
    await api.post('/cart', { productId, quantity: qty });
    await loadCart();
  };

  useEffect(() => { loadCart().catch(()=>{}); }, []);

  return (
    <CartContext.Provider value={{ items, addToCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
