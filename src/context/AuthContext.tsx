import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, isFirebaseConfigured } from '../lib/firebaseClient';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFirebaseLive: boolean;
  isSupabaseLive?: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateAdminProfile?: (name: string, email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'Jevance Ochieng',
            role: 'admin'
          });
        } else {
          setUser(null);
        }
        if (isMounted) setIsLoading(false);
      });

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } else {
      setUser(null);
      if (isMounted) setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    if (!isFirebaseConfigured || !auth) {
      setIsLoading(false);
      return {
        success: false,
        error: 'Firebase is not configured. Please add VITE_FIREBASE_* environment variables.'
      };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      if (userCredential.user) {
        setUser({
          id: userCredential.user.uid,
          email: userCredential.user.email || cleanEmail,
          name: userCredential.user.displayName || 'Jevance Ochieng',
          role: 'admin'
        });
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, error: 'Authentication failed.' };
    } catch (err: any) {
      console.error('Firebase Auth sign-in error:', err);
      setIsLoading(false);
      let msg = 'Authentication failed. Check your email and password.';
      if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/wrong-password' || err?.code === 'auth/user-not-found') {
        msg = 'Invalid email or password.';
      } else if (err?.code === 'auth/too-many-requests') {
        msg = 'Access temporarily disabled due to many failed login attempts. Try again later or reset password.';
      } else if (err?.message) {
        msg = err.message;
      }
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Error signing out from Firebase:', e);
      }
    }
    setUser(null);
    setIsLoading(false);
  };

  const updateAdminProfile = (name: string, email: string) => {
    if (!user) return;
    setUser({ ...user, name, email });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isFirebaseLive: isFirebaseConfigured,
        isSupabaseLive: isFirebaseConfigured,
        login,
        logout,
        updateAdminProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
