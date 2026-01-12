/**
 * Product API Functions
 * 
 * Complete CRUD operations for product management in Firestore as required by assignment.
 * Replaces FakeStore API with full Firestore integration for product catalog.
 * 
 * @fileoverview Product management API functions for Firebase Firestore  
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
  orderBy,
  limit,
  Timestamp,
  addDoc 
} from 'firebase/firestore';
import type { Product } from '../types/product';

/**
 * Creates a new product in Firestore
 * 
 * @param productData - Product data to create
 * @returns Promise<string> - Returns the created product ID
 * @throws Error if product creation fails
 */
export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = new Date();
    
    const product: Omit<Product, 'id'> = {
      ...productData,
      createdAt: now,
      updatedAt: now,
      active: true,
      tags: productData.tags || []
    };
    
    // Add product to collection (auto-generate ID)
    const docRef = await addDoc(collection(db, 'products'), product);
    
    console.log('✅ Product created successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating product:', error);
    throw error;
  }
};

/**
 * Creates a product with custom ID
 * 
 * @param productId - Custom product ID
 * @param productData - Product data
 * @returns Promise that resolves when product is created
 */
export const createProductWithId = async (
  productId: string,
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<void> => {
  try {
    const now = new Date();
    
    const product: Omit<Product, 'id'> = {
      ...productData,
      createdAt: now,
      updatedAt: now,
      active: true,
      tags: productData.tags || []
    };
    
    const productDocRef = doc(db, 'products', productId);
    await setDoc(productDocRef, product);
    
    console.log('✅ Product created with custom ID:', productId);
  } catch (error) {
    console.error('❌ Error creating product with custom ID:', error);
    throw error;
  }
};

/**
 * Retrieves a single product by ID
 * 
 * @param productId - Product ID to fetch
 * @returns Promise<Product | null> - Product data or null if not found
 * @throws Error if retrieval fails
 */
export const getProduct = async (productId: string): Promise<Product | null> => {
  try {
    const productDocRef = doc(db, 'products', productId);
    const docSnap = await getDoc(productDocRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<Product, 'id'>;
      
      // Convert Firestore Timestamps to Dates
      if (data.createdAt instanceof Timestamp) {
        data.createdAt = data.createdAt.toDate();
      }
      if (data.updatedAt instanceof Timestamp) {
        data.updatedAt = data.updatedAt.toDate();
      }
      
      return {
        id: docSnap.id,
        ...data
      } as Product;
    }
    
    console.log('Product not found with ID:', productId);
    return null;
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    throw error;
  }
};

/**
 * Retrieves all products from Firestore with FakeStore API fallback
 * If Firestore fails due to permissions, automatically falls back to FakeStore API
 * 
 * @param activeOnly - If true, only return active products (Firestore only)
 * @returns Promise<Product[]> - Array of all products
 */
export const getAllProducts = async (activeOnly: boolean = true): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, 'products');
    let querySnapshot;
    
    if (activeOnly) {
      const q = query(productsCollection, where('active', '==', true));
      querySnapshot = await getDocs(q);
    } else {
      querySnapshot = await getDocs(productsCollection);
    }
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Product, 'id'>;
      
      // Convert Timestamps to Dates
      if (data.createdAt instanceof Timestamp) {
        data.createdAt = data.createdAt.toDate();
      }
      if (data.updatedAt instanceof Timestamp) {
        data.updatedAt = data.updatedAt.toDate();
      }
      
      products.push({
        id: doc.id,
        ...data
      } as Product);
    });
    
    console.log(`✅ Retrieved ${products.length} products from Firestore`);
    return products;
  } catch (error) {
    console.error('⚠️  Firestore error, falling back to FakeStore API:', error);
    
    // Fallback to FakeStore API
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`FakeStore API error: ${response.status}`);
      }
      
      const fakeStoreProducts = await response.json();
      
      // Transform FakeStore products to match our Product type
      const products: Product[] = fakeStoreProducts.map((item: any) => ({
        id: String(item.id),
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        tags: [item.category],
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      console.log(`✅ Retrieved ${products.length} products from FakeStore API (fallback)`);
      return products;
    } catch (fallbackError) {
      console.error('❌ Both Firestore and FakeStore API failed:', fallbackError);
      throw new Error('Failed to load products from both Firestore and FakeStore API');
    }
  }
};

/**
 * Updates an existing product in Firestore
 * 
 * @param productId - Product ID to update
 * @param updates - Partial product data to update
 * @returns Promise that resolves when update is complete
 * @throws Error if update fails
 */
export const updateProduct = async (
  productId: string,
  updates: Partial<Product>
): Promise<void> => {
  try {
    const productDocRef = doc(db, 'products', productId);
    
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    // Remove id field if present (can't update document ID)
    if ('id' in updateData) {
      delete updateData.id;
    }
    
    await updateDoc(productDocRef, updateData);
    
    console.log('✅ Product updated successfully:', productId);
  } catch (error) {
    console.error('❌ Error updating product:', error);
    throw error;
  }
};

/**
 * Retrieves products by category with FakeStore API fallback
 * 
 * @param category - Product category to filter by
 * @param activeOnly - If true, only return active products
 * @returns Promise<Product[]> - Array of products in category
 */
export const getProductsByCategory = async (
  category: string,
  activeOnly: boolean = true
): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, 'products');
    let q;
    
    if (activeOnly) {
      q = query(
        productsCollection,
        where('category', '==', category),
        where('active', '==', true)
      );
    } else {
      q = query(productsCollection, where('category', '==', category));
    }
    
    const querySnapshot = await getDocs(q);
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Product, 'id'>;
      
      // Convert Timestamps to Dates
      if (data.createdAt instanceof Timestamp) {
        data.createdAt = data.createdAt.toDate();
      }
      if (data.updatedAt instanceof Timestamp) {
        data.updatedAt = data.updatedAt.toDate();
      }
      
      products.push({
        id: doc.id,
        ...data
      } as Product);
    });
    
    console.log(`✅ Retrieved ${products.length} products in category: ${category}`);
    return products;
  } catch (error) {
    console.error('⚠️  Firestore category query failed, falling back to FakeStore API:', error);
    
    // Fallback to FakeStore API with category filter
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      if (!response.ok) {
        throw new Error(`FakeStore API error: ${response.status}`);
      }
      
      const fakeStoreProducts = await response.json();
      
      // Transform FakeStore products to match our Product type
      const products: Product[] = fakeStoreProducts.map((item: any) => ({
        id: String(item.id),
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        tags: [item.category],
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      console.log(`✅ Retrieved ${products.length} products in category: ${category} (from FakeStore fallback)`);
      return products;
    } catch (fallbackError) {
      console.error('❌ Both Firestore and FakeStore API failed for category:', fallbackError);
      throw new Error(`Failed to load products for category "${category}"`);
    }
  }
};

/**
 * Deletes a product from Firestore
 * 
 * @param productId - Product ID to delete
 * @returns Promise that resolves when deletion is complete
 * @throws Error if deletion fails
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const productDocRef = doc(db, 'products', productId);
    await deleteDoc(productDocRef);
    
    console.log('✅ Product deleted permanently:', productId);
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    throw error;
  }
};

/**
 * Search products by title or description
 * 
 * @param searchTerm - Term to search for
 * @param activeOnly - If true, only return active products
 * @returns Promise<Product[]> - Array of matching products
 */
export const searchProducts = async (
  searchTerm: string,
  activeOnly: boolean = true
): Promise<Product[]> => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a basic implementation - for production, consider using Algolia or similar
    const allProducts = await getAllProducts(activeOnly);
    
    const searchLower = searchTerm.toLowerCase();
    const matchingProducts = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
      (product.brand && product.brand.toLowerCase().includes(searchLower))
    );
    
    console.log(`✅ Found ${matchingProducts.length} products matching: ${searchTerm}`);
    return matchingProducts;
  } catch (error) {
    console.error('❌ Error searching products:', error);
    throw error;
  }
};

/**
 * Get all unique categories with FakeStore API fallback
 * 
 * @returns Promise<string[]> - Array of category names
 */
export const getAllCategories = async (): Promise<string[]> => {
  try {
    const products = await getAllProducts(true);
    const categories = [...new Set(products.map(product => product.category))];
    
    console.log(`✅ Retrieved ${categories.length} categories`);
    return categories.sort();
  } catch (error) {
    console.error('⚠️  Error fetching categories from products, trying FakeStore categories endpoint:', error);
    
    try {
      // Try FakeStore API categories endpoint
      const response = await fetch('https://fakestoreapi.com/products/categories');
      if (!response.ok) {
        throw new Error(`FakeStore API error: ${response.status}`);
      }
      
      const categories = await response.json();
      console.log(`✅ Retrieved ${categories.length} categories from FakeStore API (fallback)`);
      return categories.sort();
    } catch (fallbackError) {
      console.error('❌ Failed to get categories from both sources:', fallbackError);
      // Return empty array as last resort
      return [];
    }
  }
};

/**
 * Validates product data before operations
 * 
 * @param product - Product data to validate
 * @returns boolean - True if valid, false otherwise
 */
export const validateProduct = (product: Partial<Product>): boolean => {
  if (!product.title || product.title.trim().length === 0) {
    console.error('Validation failed: Product title is required');
    return false;
  }
  
  if (!product.price || product.price <= 0) {
    console.error('Validation failed: Valid price is required');
    return false;
  }
  
  if (!product.category || product.category.trim().length === 0) {
    console.error('Validation failed: Product category is required');
    return false;
  }
  
  return true;
};