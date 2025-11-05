/**
 * Firebase Configuration and Initialization
 * 
 * This module sets up and configures Firebase services for the React e-commerce application.
 * It initializes Firebase Authentication and Firestore database using environment variables
 * for secure configuration management.
 * 
 * @fileoverview Firebase SDK v9+ modular configuration
 * @author Your Team
 * @version 1.0.0
 */

// Import Firebase v9+ modular SDK functions for app initialization, auth, and firestore
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

/**
 * Firebase project configuration object
 * Uses Vite environment variables (prefixed with VITE_) that are loaded from .env.local
 * These values are replaced at build time and are safe to expose to the client
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,                    // Firebase Web API Key for authentication
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,            // Domain for Firebase Authentication UI
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,              // Unique Firebase project identifier
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,      // Firebase Storage bucket URL
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string, // Firebase Cloud Messaging sender ID
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,                      // Firebase app identifier
};

/**
 * Initialize Firebase app instance
 * This creates the main Firebase app instance that all other services will use
 * Should only be called once per application lifecycle
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase Authentication service instance
 * Provides user authentication functionality including sign-in, sign-up, and user management
 * Used throughout the app for user authentication state and operations
 */
const auth: Auth = getAuth(app);

/**
 * Firestore database service instance
 * Provides NoSQL document database functionality for storing and retrieving application data
 * Used for user profiles, product data, shopping cart, and other application state
 */
const db: Firestore = getFirestore(app);

// Export the main Firebase service instances for use throughout the application
export { auth, db };

/**
 * Backwards compatibility alias for Firestore
 * Some older components may still reference 'firestore' instead of 'db'
 * This ensures smooth migration without breaking existing code
 */
export const firestore = db;