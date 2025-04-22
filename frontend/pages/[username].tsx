import { useEffect, useState } from 'react';
import api from '../services/api';
import Link from 'next/link';
import Header from '../components/Header';
import UserListings, { User } from '../components/User';
import { useRouter } from 'next/router';

const UserPage: React.FC = () => {
    const { query } = useRouter();
    const [user, setUser] = useState<User>();

    // todo: add users/username/:username route, ensure username is unique
    useEffect(() => {
        api.get<User>(`/users/username/${query.username}`)
           .then(res => setUser(res.data))
           .catch(console.error);
    }, []);
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#8C1515] to-[#B83A3A] text-white rounded-xl p-10 mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Welcome to FarmSale</h1>
              <p className="text-xl md:text-2xl mb-6 text-center">Stanford's Marketplace for Graduating Seniors</p>
            </section>
    
            {/* Products Section */}
            {user && <UserListings {...user} />}
          </main>
        </div>
      );
}

export default UserPage;