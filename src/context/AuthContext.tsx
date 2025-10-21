// src/context/AuthContext.tsx
import React, { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../components/firebaseConfig";
import {
  User,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = async () => signOut(auth);

  const register = async (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy access
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export { AuthContext };