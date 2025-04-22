import { useEffect, useState } from 'react';
import api from '../services/api';
import Link from 'next/link';
import Header from '../components/Header';
import UserListings, { User } from '../components/User';
import { useRouter } from 'next/router';

const UserPage: React.FC = () => {
    const { query } = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
          try {
              const res = await api.get<User | null>(`/users/username/${query.username}`);
              setUser(res.data);
          } catch (err) {
              console.error(err);
          }
      };
      fetchUser();
  }, [query.username]);
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
            {/* Products Section */}
            {user && <UserListings {...user} />}
          </main>
        </div>
      );
}

export default UserPage;