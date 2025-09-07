'use client';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearisAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) {
          setUser(user);
        }
      } else {
        clearisAuthenticated();
      }
      setLoading(false);
    };

    fetchUser();
  }, [setUser, clearisAuthenticated]);
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return children;
};

export default AuthProvider;
