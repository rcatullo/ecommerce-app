import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items } = useCart();
  if (!items.length) return <p>Your cart is empty.</p>;

  return (
    <main>
      <h1>Your Cart</h1>
      <ul>
        {items.map(i => (
          <li key={i.id}>
            {i.name} — {i.quantity} × ${i.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CartPage;
