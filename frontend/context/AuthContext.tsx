import { createContext, useState, useContext, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';
import api from '../services/api';
import { User } from '../components/User';

interface AuthContextType {
  token: string | null;
  authUser: User | null;
  signup(email: string, username: string, password: string, is_seller: boolean, 
    setSuccess: Dispatch<SetStateAction<string | null>>, 
    setError: Dispatch<SetStateAction<string | null>>): Promise<void>;
  login(email: string, password: string, 
    setSuccess: Dispatch<SetStateAction<string | null>>, 
    setError: Dispatch<SetStateAction<string | null>>): Promise<void>;
  logout(): void;
  isPageOwner(username: string): boolean;
}

// Type guard for Axios error with response.data.error
export function isAxiosErrMsg(err: unknown): err is { response: { data: { error: string } } } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof (err as any).response === 'object' &&
    (err as any).response !== null &&
    'data' in (err as any).response &&
    typeof (err as any).response.data === 'object' &&
    (err as any).response.data !== null &&
    'error' in (err as any).response.data
  );
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );
  const [authUser, setUser] = useState<User | null>(null);

  const signup = async (email: string, username: string, password: string, is_seller: boolean, 
                          setSuccess: Dispatch<SetStateAction<string | null>>,
                          setError: Dispatch<SetStateAction<string | null>>) => {
    setError(null);
    setSuccess(null);
    const data = { email, username, password };
    try {
      const res = await api.post(`/auth/signup?seller=${is_seller}`, data);
      if (res.status === 201) {
        setSuccess('Signup successful! Please check your Stanford email to verify your account.');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  const login = async (email: string, password: string, 
                        setSuccess: Dispatch<SetStateAction<string | null>>,
                        setError: Dispatch<SetStateAction<string | null>>) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
      if (res.status === 200) {
        setSuccess('Login successful! Redirecting...');
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Check if user owns the page [username].tsx
  const isPageOwner = (username: string): boolean => {
    return !!authUser && authUser.username === username;
  };

  // Restore user from API if token exists but user is null
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !authUser) {
        try {
          const res = await api.get<{ user: User }>('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data.user);
        } catch {
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, authUser]);

  return (
    <AuthContext.Provider value={{ token, authUser, signup, login, logout, isPageOwner }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
