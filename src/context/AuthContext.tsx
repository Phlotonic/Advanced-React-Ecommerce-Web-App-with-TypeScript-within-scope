/**
 * Authentication Context for Firebase Auth Integration
 * 
 * This module provides a React context for managing user authentication state
 * throughout the application. It wraps Firebase Auth functionality and provides
 * easy-to-use hooks and providers for authentication operations.
 * 
 * @fileoverview Firebase Authentication context and provider
 * @author Your Team
 * @version 1.0.0
 */

import React, { useContext, createContext, useEffect, useState } from "react";
// Import Firebase auth and db instances from our configuration
import { auth } from "../config/firebase";
// Import Firebase Auth v9+ functions and types
import {
  User,                             // Firebase User type
  UserCredential,                   // Return type for auth operations
  onAuthStateChanged,               // Auth state listener
  signInWithEmailAndPassword,       // Email/password sign-in
  createUserWithEmailAndPassword,   // User registration
  signOut                          // Sign-out function
} from "firebase/auth";
import { createUserProfile } from "../utils/userApi"; // User profile creation function

/**
 * Authentication Context Type Definition
 * 
 * Defines the shape of the authentication context that will be provided
 * to consuming components throughout the application
 */
export interface AuthContextType {
  user: User | null;                                                    // Current authenticated user or null
  login: (email: string, password: string) => Promise<UserCredential>;  // Login function
  logout: () => Promise<void>;                                          // Logout function
  register: (email: string, password: string) => Promise<UserCredential>; // Registration function
}

/**
 * Create the Authentication Context
 * 
 * This context will hold the authentication state and methods.
 * Initialized as undefined to enforce proper usage within AuthProvider.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * 
 * This component wraps the application (or parts of it) to provide authentication
 * state and methods to all child components. It manages the Firebase auth state
 * and provides convenient methods for authentication operations.
 * 
 * @param children - React components that will have access to auth context
 * @returns JSX element that provides authentication context to children
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to track the currently authenticated user
  const [user, setUser] = useState<User | null>(null);

  /**
   * Set up Firebase Auth State Listener
   * 
   * This effect runs once when the component mounts and sets up a listener
   * for authentication state changes. The listener automatically updates
   * the user state when users sign in, sign out, or their auth state changes.
   */
  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state when auth state changes
    });
    
    // Cleanup function: unsubscribe from auth state listener when component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array - this effect runs only once

  /**
   * User Login Function
   * 
   * Attempts to sign in a user with email and password using Firebase Auth.
   * Returns a Promise that resolves with UserCredential on success or rejects on failure.
   * 
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise<UserCredential> - Firebase auth result
   */
  const login = async (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * User Logout Function
   * 
   * Signs out the currently authenticated user from Firebase Auth.
   * Clears the authentication state and returns the user to an unauthenticated state.
   * 
   * @returns Promise<void> - Resolves when logout is complete
   */
  const logout = async (): Promise<void> => {
    return signOut(auth);
  };

  /**
   * User Registration Function
   * 
   * Creates a new user account with email and password using Firebase Auth.
   * The new user will be automatically signed in after successful registration.
   * Also creates a complete user profile in Firestore with all required fields.
   * 
   * @param email - New user's email address
   * @param password - New user's password
   * @returns Promise<UserCredential> - Firebase auth result with new user info
   */
  const register = async (email: string, password: string): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create a complete user profile in Firestore with all required fields
    await createUserProfile(user.uid, email);
    
    return userCredential;
  };

  // Provide authentication context value to all child components
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom Hook for Accessing Authentication Context
 * 
 * This hook provides a convenient way for components to access the authentication
 * context. It includes error handling to ensure the hook is used within an AuthProvider.
 * 
 * @returns AuthContextType - The authentication context with user state and methods
 * @throws Error if used outside of AuthProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, login, logout } = useAuth();
 *   
 *   if (user) {
 *     return <div>Welcome, {user.email}!</div>;
 *   }
 *   return <div>Please log in</div>;
 * }
 * ```
 */
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  
  // Ensure hook is used within AuthProvider
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  
  return ctx;
};

// Export the context for advanced use cases (normally not needed)
export { AuthContext };