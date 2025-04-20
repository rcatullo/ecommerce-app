import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import { useCart } from '../context/CartContext';


const CheckoutPage: React.FC = () => {
    const { items, loadCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    // Calculate total
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  
    const handlePlaceOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1) Call the backend to create an order
        const res = await api.post<{ id: number }>('/orders');
        const orderId = res.data.id;
  
        // 2) Refresh cart context (it should now be empty)
        await loadCart();
  
        // 3) Redirect to the Order Detail page
        router.push(`/orders/${orderId}`);
      } catch (e: any) {
        setError(e.response?.data?.error || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
  
    if (!items.length) {
      return <p>Your cart is empty. Add something before checking out.</p>;
    }
  
    return (
      <main>
        <h1>Checkout</h1>
        <ul>
          {items.map(i => (
            <li key={i.id}>
              {i.name} — {i.quantity} × ${i.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p><strong>Total: ${total.toFixed(2)}</strong></p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handlePlaceOrder} disabled={loading}>
          {loading ? 'Placing Order…' : 'Place Order'}
        </button>
      </main>
    );
  };
  
  export default CheckoutPage;
  