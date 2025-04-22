import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#8C1515] dark:text-red-300 text-center mb-4">Welcome Back</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Log in with your SUNet ID</p>
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
            <button
              type="submit"
              className="w-full bg-[#8C1515] dark:bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 dark:hover:bg-red-500 transition-colors"
            >
              Log In with SUNet ID
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/forgot-password" className="text-sm text-[#8C1515] dark:text-red-300 hover:underline">Forgot your password?</a>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Not a Stanford senior?{' '}
              <a href="/signup" className="text-[#8C1515] dark:text-red-300 font-medium hover:underline">Sign up here</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;