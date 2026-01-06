/**
 * User API Functions
 * 
 * Complete CRUD operations for user management in Firestore as required by assignment.
 * Handles user profile creation on registration, reading, updating, and account deletion.
 * 
 * @fileoverview User management API functions for Firebase Firestore  
 * @version 1.0.0
 */

import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  query,
  where,
  Timestamp 
} from 'firebase/firestore';
import { deleteUser, User } from 'firebase/auth';

/**
 * Enhanced User Profile Interface for Assignment Requirements
 */
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Creates a new user profile document in Firestore
 * Called automatically during user registration
 * 
 * @param uid - Firebase Auth user ID
 * @param email - User's email address
 * @param displayName - User's display name (optional)
 * @returns Promise that resolves when profile is created
 * @throws Error if profile creation fails
 */
export const createUserProfile = async (
  uid: string, 
  email: string, 
  displayName?: string
): Promise<void> => {
  try {
    const now = new Date();
    
    const userData: UserProfile = {
      uid,
      email,
      displayName: displayName || '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US'
      },
      preferences: {
        notifications: true,
        newsletter: false,
        theme: 'auto'
      },
      createdAt: now,
      updatedAt: now
    };
    
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, userData);
    
    console.log('✅ User profile created successfully for:', email);
  } catch (error) {
    console.error('❌ Error creating user profile:', error);
    throw error;
  }
};

/**
 * Retrieves user profile data from Firestore
 * 
 * @param uid - User identifier to fetch
 * @returns Promise<UserProfile | null> - User profile or null if not found
 * @throws Error if retrieval fails
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as UserProfile;
      // Convert Firestore Timestamps to Dates
      if (data.createdAt instanceof Timestamp) {
        data.createdAt = data.createdAt.toDate();
      }
      if (data.updatedAt instanceof Timestamp) {
        data.updatedAt = data.updatedAt.toDate();
      }
      return data;
    }
    
    console.log('No user profile found for UID:', uid);
    return null;
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Updates existing user profile in Firestore
 * 
 * @param uid - User identifier
 * @param updates - Partial user profile data to update
 * @returns Promise that resolves when update is complete
 * @throws Error if update fails
 */
export const updateUserProfile = async (
  uid: string, 
  updates: Partial<UserProfile>
): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    
    // Add updatedAt timestamp
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    await updateDoc(userDocRef, updateData);
    console.log('✅ User profile updated successfully');
  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    throw error;
  }
};

/**
 * Deletes user profile from Firestore (soft delete recommended)
 * 
 * @param uid - User identifier to delete
 * @returns Promise that resolves when deletion is complete
 * @throws Error if deletion fails
 */
export const deleteUserProfile = async (uid: string): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await deleteDoc(userDocRef);
    
    console.log('✅ User profile deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting user profile:', error);
    throw error;
  }
};

/**
 * Complete user account deletion (profile + auth)
 * WARNING: This permanently deletes the user's Firebase Auth account
 * 
 * @param user - Firebase Auth User object
 * @returns Promise that resolves when complete deletion is done
 * @throws Error if deletion fails
 */
export const deleteCompleteUserAccount = async (user: User): Promise<void> => {
  try {
    // First delete the Firestore profile
    await deleteUserProfile(user.uid);
    
    // Then delete the Firebase Auth account
    await deleteUser(user);
    
    console.log('✅ Complete user account deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting complete user account:', error);
    throw error;
  }
};

/**
 * Get all users (Admin function - use carefully)
 * 
 * @returns Promise<UserProfile[]> - Array of all user profiles
 * @throws Error if retrieval fails
 */
export const getAllUsers = async (): Promise<UserProfile[]> => {
  try {
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollection);
    
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as UserProfile;
      // Convert Timestamps to Dates
      if (data.createdAt instanceof Timestamp) {
        data.createdAt = data.createdAt.toDate();
      }
      if (data.updatedAt instanceof Timestamp) {
        data.updatedAt = data.updatedAt.toDate();
      }
      users.push(data);
    });
    
    return users;
  } catch (error) {
    console.error('❌ Error fetching all users:', error);
    throw error;
  }
};

/**
 * Search users by email
 * 
 * @param email - Email to search for
 * @returns Promise<UserProfile | null> - User profile or null
 * @throws Error if search fails
 */
export const getUserByEmail = async (email: string): Promise<UserProfile | null> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data() as UserProfile;
      
      // Convert Timestamps to Dates
      if (data.createdAt instanceof Timestamp) {
        data.createdAt = data.createdAt.toDate();
      }
      if (data.updatedAt instanceof Timestamp) {
        data.updatedAt = data.updatedAt.toDate();
      }
      
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error searching user by email:', error);
    throw error;
  }
};

/**
 * Validates user profile data before operations
 * 
 * @param profile - User profile to validate
 * @returns boolean - True if valid, false otherwise
 */
export const validateUserProfile = (profile: Partial<UserProfile>): boolean => {
  if (!profile.email) {
    console.error('Validation failed: Email is required');
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(profile.email)) {
    console.error('Validation failed: Invalid email format');
    return false;
  }
  
  return true;
};

/**
 * Update user preferences
 * 
 * @param uid - User identifier
 * @param preferences - New preferences
 * @returns Promise that resolves when update is complete
 */
export const updateUserPreferences = async (
  uid: string,
  preferences: Partial<UserProfile['preferences']>
): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      preferences,
      updatedAt: new Date()
    });
    
    console.log('✅ User preferences updated successfully');
  } catch (error) {
    console.error('❌ Error updating user preferences:', error);
    throw error;
  }
};