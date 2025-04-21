import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ProductProvider } from '../context/ProductContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Component {...pageProps} />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>

  );
}



export default MyApp;
