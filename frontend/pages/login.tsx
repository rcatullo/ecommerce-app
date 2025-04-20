import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#8C1515]">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Log in with your SUNet ID</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Stanford Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="sunet@stanford.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8C1515] text-white py-2 px-4 rounded-md hover:bg-[#660C0C] focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2 transition-colors"
          >
            Log In with SUNet ID
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link href="/forgot-password" className="block text-[#8C1515] hover:text-[#660C0C] text-sm">
            Forgot your password?
          </Link>
          <p className="text-gray-600">
            Not a Stanford senior?{' '}
            <Link href="/signup" className="text-[#8C1515] hover:text-[#660C0C] font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
