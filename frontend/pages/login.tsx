import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, setSuccess, setError);
  };

  useEffect(() => {
    if (success) {
      router.push('/');
    }
  }, [success, router]);

  return (
    <>
    <div className="relative bg-white">
    <div className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] sm:bg-linear-145"></div>
      <div className='relative px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-7xl'>
      <Header />
      <main>
      <div className="py-32">
        <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-black text-center mb-4">
          <span className="font-unifraktur">login</span>
          </h1>
          <p className="text-center text-gray-600 mb-6">Log in with your SUNet ID</p>
          {success && (
            <div className="mb-4 text-green-600 dark:text-green-300 text-center font-medium">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-600 dark:text-red-300 text-center font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Stanford Email</label>
              <input
                id="email"
                type="email"
                placeholder="sunet@stanford.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
              />
            </div>
            <div className="mt-12 text-center">
                    <button type="submit" className="transition-transform ease-in-out duration-500 hover:scale-105 w-full sm:w-auto inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md text-base font-medium whitespace-nowrap text-white data-disabled:bg-gray-950 data-disabled:opacity-40 data-hover:bg-gray-800">
                        Log In with SUNet ID
                    </button>
                </div>
          </form>
          { /* Need to implement password recovery */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mt-4">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium hover:underline">Sign up here</a>
            </p>
          </div>
          </div>
        </div>
      </div>
    </main>
      </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LoginPage;