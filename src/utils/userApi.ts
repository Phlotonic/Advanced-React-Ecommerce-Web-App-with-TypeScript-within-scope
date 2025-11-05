/**
 * User API Utilities for Firestore Operations
 * 
 * This module provides functions for managing user profiles in Firestore database.
 * It handles CRUD operations for user data including creation, retrieval, and validation.
 * 
 * @fileoverview User profile management with Firestore v9+ SDK
 * @author Your Team
 * @version 1.0.0
 */

// Import Firestore database instance from Firebase configuration
import { db } from '../config/firebase';
// Import Firestore v9+ modular functions for document operations
import { collection, doc, setDoc, getDoc, DocumentData } from 'firebase/firestore';

/**
 * User Profile Data Interface
 * Defines the structure of user profile data stored in Firestore
 */
export interface UserProfile {
  id: string;      // Unique user identifier (typically Firebase Auth UID)
  email: string;   // User's email address
  name: string;    // User's display name
  address: string; // User's physical address for shipping
}

/**
 * Creates a new user profile document in Firestore
 * 
 * This function stores user profile information in the 'users' collection
 * using the provided user ID as the document ID. If a document with the same ID
 * already exists, it will be overwritten.
 * 
 * @param id - Unique identifier for the user (typically Firebase Auth UID)
 * @param email - User's email address from authentication
 * @param name - User's display name or full name
 * @param address - User's shipping/billing address
 * @returns Promise<UserProfile> - Returns the created user profile data
 * @throws Will throw an error if the Firestore write operation fails
 * 
 * @example
 * ```typescript
 * const profile = await createUserProfile(
 *   'abc123',
 *   'user@example.com',
 *   'John Doe',
 *   '123 Main St, City, State'
 * );
 * console.log('Created profile:', profile);
 * ```
 */
export async function createUserProfile(
  id: string, 
  email: string, 
  name: string, 
  address: string
): Promise<UserProfile> {
  // Create a reference to the specific user document in the 'users' collection
  const userRef = doc(db, 'users', id);
  
  // Prepare the user profile data object
  const data: UserProfile = { id, email, name, address };
  
  // Write the document to Firestore (creates or overwrites existing document)
  await setDoc(userRef, data);
  
  // Return the created profile data for confirmation
  return data;
}

/**
 * Retrieves a user profile from Firestore by user ID
 * 
 * This function fetches user profile data from the 'users' collection
 * using the provided user ID. Returns null if the user profile doesn't exist.
 * 
 * @param id - Unique identifier of the user to retrieve
 * @returns Promise<UserProfile | null> - Returns user profile data or null if not found
 * @throws Will throw an error if the Firestore read operation fails
 * 
 * @example
 * ```typescript
 * const profile = await getUserProfile('abc123');
 * if (profile) {
 *   console.log('User found:', profile.name);
 * } else {
 *   console.log('User not found');
 * }
 * ```
 */
export async function getUserProfile(id: string): Promise<UserProfile | null> {
  // Create a reference to the specific user document
  const docRef = doc(db, 'users', id);
  
  // Attempt to fetch the document from Firestore
  const docSnap = await getDoc(docRef);
  
  // Check if the document exists and return data or null accordingly
  if (docSnap.exists()) {
    // Type assertion to ensure returned data matches UserProfile interface
    return docSnap.data() as UserProfile;
  } else {
    // Document doesn't exist, return null to indicate user not found
    return null;
  }
}