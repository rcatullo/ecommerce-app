import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <ProductProvider>
          <Component {...pageProps} />
        </ProductProvider>
    </AuthProvider>

  );
}



export default MyApp;
