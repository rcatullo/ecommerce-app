import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api';
import { User } from '../components/User';

interface AuthContextType {
  token: string | null;
  user: User | null;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  isPageOwner(storeName: string): boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Check if user owns the page [username].tsx
  const isPageOwner = (username: string): boolean => {
    return Boolean(
      user?.is_seller &&
      user?.username === username
    );
  };

  // Restore user from API if token exists but user is null
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
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
  }, [token, user]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isPageOwner }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
