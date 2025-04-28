import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import api from '../services/api';

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) return;
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email?token=${token}`);
        setStatus('success');
        setMessage(res.data.message || 'Email verified successfully. You can now log in.');
      } catch (err: unknown) {
        setStatus('error');
        if (
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof (err as any).response === 'object' &&
          (err as any).response !== null &&
          'data' in (err as any).response &&
          typeof (err as any).response.data === 'object' &&
          (err as any).response.data !== null &&
          'error' in (err as any).response.data
        ) {
          setMessage((err as any).response.data.error);
        } else {
          setMessage('Verification failed. The link may be invalid or expired.');
        }
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#8C1515] dark:text-red-300">Email Verification</h1>
          {status === 'pending' && (
            <div className="text-gray-600 dark:text-gray-300">Verifying your email...</div>
          )}
          {status === 'success' && (
            <div className="text-green-600 dark:text-green-300 mb-4">{message}</div>
          )}
          {status === 'error' && (
            <div className="text-red-600 dark:text-red-300 mb-4">{message}</div>
          )}
          <a
            href="/login"
            className="inline-block mt-4 px-4 py-2 bg-[#8C1515] dark:bg-red-600 text-white rounded hover:bg-red-700 dark:hover:bg-red-500 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmailPage;
