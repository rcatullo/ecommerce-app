import { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import UserListings, { User } from '../components/User';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import NewListing from '../components/NewListing';
import { Product } from '../components/Product'; // Import Product type

const UserPage: React.FC = () => {
    const { query } = useRouter();
    const { isPageOwner, authUser } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [owner, setOwner] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    // Fetch user info
    useEffect(() => {
      const fetchUser = async () => {
          try {
              if (typeof query.username !== "string") return;
              const res = await api.get<User | null>(`/users/username/${query.username}`);
              setUser(res.data);
          } catch (err) {
              console.error(err);
          }
      };
      fetchUser();
    }, [query.username]);

    // Fetch products for user
    const fetchProducts = async (userId: number) => {
      try {
        const res = await api.get<Product[]>(`/users/${userId}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Refresh listings when user changes
    useEffect(() => {
      if (user?.id) {
        fetchProducts(user.id);
      }
    }, [user]);

    useEffect(() => {
      if (typeof query.username === "string" && authUser) {
          setOwner(isPageOwner(query.username));
      }
    }, [query.username, isPageOwner, authUser]);

    // Callback to refresh listings
    const refreshListings = () => {
      if (user?.id) {
        fetchProducts(user.id);
      }
    };

    if (!user) return null;

    return (
        <>
        <div className="relative bg-white">
        <div className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] sm:bg-linear-145"></div>
          <div className='relative px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl lg:max-w-7xl'>
          <Header />
          <main>
            <div className="py-16">
              <h2 className="text-3xl font-bold mb-8 text-center"><span className="font-unifraktur">{user.username}</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {user && <UserListings products={products} />}
                {user && owner && <NewListing {...user} onListingCreated={refreshListings} />}
              </div>
            </div>
          </main>
          </div>
          </div>
        </div>
        <Footer/>
        </>
      );
}

export default UserPage;