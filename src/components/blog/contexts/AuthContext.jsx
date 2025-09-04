import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = (email, password) => {
    toast({
      title: "🚧 Supabase Integration Needed!",
      description: "Please complete the Supabase integration to enable user sign-up.",
      variant: "destructive"
    });
    return null;
  };

  const signIn = (email, password) => {
    toast({
      title: "🚧 Supabase Integration Needed!",
      description: "Please complete the Supabase integration to enable user sign-in.",
      variant: "destructive"
    });
    return null;
  };
  
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
        title: "Signed Out",
        description: "You have been successfully signed out."
    });
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin: user?.is_admin || false
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};