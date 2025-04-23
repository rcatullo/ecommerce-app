import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { authUser, logout } = useAuth();

  return (
    <header className="pt-12 sm:pt-16">
      <div className="relative flex justify-between group/row relative isolate pt-[calc(--spacing(2)+1px)] last:pb-[calc(--spacing(2)+1px)]">
        <div className="relative flex gap-6">
          <div className="py-3 group/item relative">
        <Link href="/" className="h-9 overflow-visible flex items-center">
            <Image src="/logo.svg" alt="FarmSale Logo" width={32} height={32} className="rounded-xl"/>
            <span className="ml-4 text-xl font-unifraktur text-black">
              treesail</span>
        </Link>
        </div>
        
        </div>
        <nav className="flex items-center space-x-4">
          {authUser ? (
            <>
              <span className="text-gray-800 dark:text-gray-200">Hello, {authUser.username}</span>
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