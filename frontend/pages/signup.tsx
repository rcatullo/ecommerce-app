import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import api from '../services/api';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, username, password);
    router.push('/');
  };

  const signup = async (email: string, username: string, password: string) => {
    const res = await api.post('/auth/signup', { email, username, password });
    if (res.status === 201) {
      alert('Signup successful!');
    } else {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#8C1515]">Join FarmSale</h1>
          <p className="mt-2 text-gray-600">Connect with Stanford's graduating community</p>
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
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="username"
              type="text"
              placeholder="Your name"
              value={username}
              onChange={e => setUsername(e.target.value)}
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
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
            />
          </div>

          <div className="text-sm text-gray-600">
            <p>By signing up, you confirm that you are a graduating Stanford senior.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8C1515] text-white py-2 px-4 rounded-md hover:bg-[#660C0C] focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2 transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[#8C1515] hover:text-[#660C0C] font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
