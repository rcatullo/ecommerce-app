import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import api from '../services/api';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const signup = async (email: string, username: string, password: string) => {
    setError(null);
    setSuccess(null);
    const data = { email, username, password };
    try {
      const res = await api.post(`/auth/signup?seller=${isSeller}`, data);
      if (res.status === 201) {
        setSuccess('Signup successful! Please check your Stanford email to verify your account.');
        // router.push('/'); // Don't redirect immediately
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, username, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#8C1515] dark:text-red-300 text-center mb-4">Join FarmSale</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Connect with Stanford's graduating community</p>
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
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
              />
            </div>
            <div className="flex items-center">
              <input
                id="seller"
                type="checkbox"
                checked={isSeller}
                onChange={e => setIsSeller(e.target.checked)}
                className="h-4 w-4 text-[#8C1515] focus:ring-[#8C1515] border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="seller" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                I want to sell items
              </label>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              By signing up, you confirm that you are a graduating Stanford senior.
            </div>
            <button
              type="submit"
              className="w-full bg-[#8C1515] dark:bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 dark:hover:bg-red-500 transition-colors"
            >
              Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <a href="/login" className="text-[#8C1515] dark:text-red-300 font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
