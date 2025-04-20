import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../services/api';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  // you can join product name on backend or fetch separately
  product_name: string;
}
interface Order {
  id: number;
  created_at: string;
  status: string;
  items: OrderItem[];
}

const OrderDetailPage: React.FC = () => {
  const { query } = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.id) return;
    api.get<Order>(`/orders/${query.id}`)
      .then(res => setOrder(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query.id]);

  if (loading) return <p>Loading order…</p>;
  if (!order) return <p>Order not found.</p>;

  const total = order.items.reduce(
    (sum, i) => sum + i.unit_price * i.quantity,
    0
  );

  return (
    <main>
      <h1>Order #{order.id}</h1>
      <p>Status: {order.status}</p>
      <p>Placed on: {new Date(order.created_at).toLocaleString()}</p>
      <h2>Items</h2>
      <ul>
        {order.items.map(i => (
          <li key={i.id}>
            {i.product_name} — {i.quantity} × ${i.unit_price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p><strong>Total Paid: ${total.toFixed(2)}</strong></p>
    </main>
  );
};

export default OrderDetailPage;
