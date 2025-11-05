/**
 * Product API Utilities for Firestore Operations
 * 
 * This module provides functions for managing product data in Firestore database.
 * It handles CRUD operations for products including creation, retrieval, updates,
 * and deletion. Implemented using Test Driven Development (TDD).
 * 
 * @fileoverview Product management with Firestore v9+ SDK
 * @author Your Team  
 * @version 1.0.0
 */

// Import Firestore database instance from Firebase configuration
import { db } from '../config/firebase';
// Import Firestore v9+ modular functions for document operations
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    DocumentData,
    QuerySnapshot 
} from 'firebase/firestore';

/**
 * Product Data Interface
 * Defines the structure of product data stored in Firestore
 */
export interface Product {
    id: string;          // Unique product identifier
    name: string;        // Product name/title
    price: number;       // Product price in USD
    description: string; // Detailed product description
    image: string;       // Product image URL
    category: string;    // Product category
    stock: number;       // Available inventory count
}

/**
 * Creates a new product document in Firestore
 * 
 * @param productData - Complete product information to store
 * @returns Promise<Product> - Returns the created product data
 * @throws Will throw an error if the Firestore write operation fails
 * 
 * @example
 * ```typescript
 * const newProduct = await createProduct({
 *   id: 'prod123',
 *   name: 'Wireless Headphones',
 *   price: 99.99,
 *   description: 'High-quality wireless headphones',
 *   image: 'https://example.com/headphones.jpg',
 *   category: 'Electronics',
 *   stock: 50
 * });
 * ```
 */
export async function createProduct(productData: Product): Promise<Product> {
    // Create a reference to the specific product document in 'products' collection
    const productRef = doc(db, 'products', productData.id);
    
    // Write the product document to Firestore
    await setDoc(productRef, productData);
    
    // Return the created product data for confirmation
    return productData;
}

/**
 * Retrieves a single product from Firestore by ID
 * 
 * @param id - Unique identifier of the product to retrieve
 * @returns Promise<Product | null> - Returns product data or null if not found
 * @throws Will throw an error if the Firestore read operation fails
 * 
 * @example
 * ```typescript
 * const product = await getProduct('prod123');
 * if (product) {
 *   console.log('Product found:', product.name);
 * }
 * ```
 */
export async function getProduct(id: string): Promise<Product | null> {
    // Create a reference to the specific product document
    const docRef = doc(db, 'products', id);
    
    // Attempt to fetch the document from Firestore
    const docSnap = await getDoc(docRef);
    
    // Check if document exists and return data or null
    if (docSnap.exists()) {
        return docSnap.data() as Product;
    } else {
        return null;
    }
}

/**
 * Retrieves all products from Firestore
 * 
 * @returns Promise<Product[]> - Returns array of all products
 * @throws Will throw an error if the Firestore read operation fails
 * 
 * @example
 * ```typescript
 * const allProducts = await getAllProducts();
 * console.log(`Found ${allProducts.length} products`);
 * ```
 */
export async function getAllProducts(): Promise<Product[]> {
    // Get all documents from the 'products' collection
    const querySnapshot = await getDocs(collection(db, 'products'));
    
    // Map Firestore documents to Product objects
    const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Product[];
    
    return products;
}

/**
 * Updates an existing product in Firestore with partial data
 * 
 * @param id - Unique identifier of the product to update
 * @param updateData - Object containing only the fields to update
 * @returns Promise<Partial<Product>> - Returns the updated data
 * @throws Will throw an error if the Firestore update operation fails
 * 
 * @example
 * ```typescript
 * const updated = await updateProduct('prod123', {
 *   price: 79.99,
 *   stock: 25
 * });
 * ```
 */
export async function updateProduct(
    id: string, 
    updateData: Partial<Product>
): Promise<Partial<Product>> {
    // Create a reference to the specific product document
    const productRef = doc(db, 'products', id);
    
    // Update only the specified fields in Firestore
    await updateDoc(productRef, updateData);
    
    // Return the updated data for confirmation
    return updateData;
}

/**
 * Deletes a product from Firestore
 * 
 * @param id - Unique identifier of the product to delete
 * @returns Promise<boolean> - Returns true if deletion was successful
 * @throws Will throw an error if the Firestore delete operation fails
 * 
 * @example
 * ```typescript
 * const success = await deleteProduct('prod123');
 * if (success) {
 *   console.log('Product deleted successfully');
 * }
 * ```
 */
export async function deleteProduct(id: string): Promise<boolean> {
    // Create a reference to the specific product document
    const productRef = doc(db, 'products', id);
    
    // Delete the document from Firestore
    await deleteDoc(productRef);
    
    // Return true to confirm successful deletion
    return true;
}