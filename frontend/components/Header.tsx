import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-brand shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="FarmSale Logo" width={48} height={48} className=""/>
            <span className="ml-4 text-xl font-semibold text-brand dark:text-brand-light">FarmSale</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-800 dark:text-gray-200">Hello, {user.username}</span>
              <button
                onClick={logout}
                className="text-sm font-medium text-brand dark:text-brand-light hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">
                  Login
              </Link>

              <Link href="/signup" className="text-sm font-medium bg-brand text-white px-3 py-1 rounded-md hover:bg-brand-dark transition-colors">
                  Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;