/**
 * Order Management API
 * 
 * This module provides comprehensive order management functionality for the e-commerce application.
 * Handles order creation, retrieval, status updates, and order history management.
 * Implements Firebase Firestore integration with proper error handling.
 * 
 * @fileoverview Order CRUD operations with Firebase Firestore
 * @author Your Team
 * @version 1.0.0
 * @see {@link https://firebase.google.com/docs/firestore} Firebase Firestore Documentation
 */

import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    query, 
    where, 
    orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Represents an individual item within an order
 * 
 * @interface OrderItem
 * @property {string} productId - Unique identifier for the product
 * @property {string} name - Display name of the product
 * @property {number} price - Unit price of the product
 * @property {number} quantity - Number of units ordered
 */
export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

/**
 * Represents a complete order in the system
 * 
 * @interface Order
 * @property {string} orderId - Unique identifier for the order
 * @property {string} userId - ID of the user who placed the order
 * @property {OrderItem[]} products - Array of ordered products
 * @property {number} totalPrice - Total calculated price for the order
 * @property {'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'} status - Current order status
 * @property {Date} createdAt - Timestamp when the order was created
 * @property {string} shippingAddress - Delivery address for the order
 */
export interface Order {
    orderId: string;
    userId: string;
    products: OrderItem[];
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
    shippingAddress: string;
}

/**
 * Input data required to create a new order
 * 
 * @interface CreateOrderData
 * @property {string} userId - ID of the user placing the order
 * @property {OrderItem[]} products - Array of products being ordered
 * @property {string} shippingAddress - Delivery address for the order
 */
export interface CreateOrderData {
    userId: string;
    products: OrderItem[];
    shippingAddress: string;
}

/**
 * Creates a new order in Firestore with auto-generated ID and calculated total
 * 
 * This function implements the core order creation logic:
 * - Generates a unique order ID
 * - Calculates total price from product items
 * - Sets initial status to 'pending'
 * - Stores order data in Firestore 'orders' collection
 * 
 * @async
 * @function createOrder
 * @param {CreateOrderData} orderData - Order information including user, products, and shipping
 * @returns {Promise<Order>} Promise that resolves to the created order object
 * @throws {Error} When Firestore operation fails or validation errors occur
 * 
 * @example
 * ```typescript
 * const orderData = {
 *   userId: 'user123',
 *   products: [
 *     { productId: 'prod1', name: 'Laptop', price: 999.99, quantity: 1 }
 *   ],
 *   shippingAddress: '123 Main St, City, State 12345'
 * };
 * 
 * try {
 *   const newOrder = await createOrder(orderData);
 *   console.log('Order created:', newOrder.orderId);
 * } catch (error) {
 *   console.error('Failed to create order:', error);
 * }
 * ```
 */
export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
    try {
        // Generate unique order ID using timestamp and random string
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Calculate total price from all products
        const totalPrice = orderData.products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
        
        // Create complete order object
        const order: Order = {
            orderId,
            userId: orderData.userId,
            products: orderData.products,
            totalPrice: Math.round(totalPrice * 100) / 100, // Round to 2 decimal places
            status: 'pending',
            createdAt: new Date(),
            shippingAddress: orderData.shippingAddress
        };
        
        // Store order in Firestore
        const orderDoc = doc(db, 'orders', orderId);
        await setDoc(orderDoc, order);
        
        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

/**
 * Retrieves a single order by its unique ID
 * 
 * Fetches order details from Firestore and handles proper type conversion
 * for timestamp fields. Returns null if the order doesn't exist.
 * 
 * @async
 * @function getOrder
 * @param {string} orderId - Unique identifier of the order to retrieve
 * @returns {Promise<Order | null>} Promise that resolves to order object or null if not found
 * @throws {Error} When Firestore operation fails
 * 
 * @example
 * ```typescript
 * try {
 *   const order = await getOrder('order123');
 *   if (order) {
 *     console.log('Order found:', order.orderId);
 *     console.log('Status:', order.status);
 *   } else {
 *     console.log('Order not found');
 *   }
 * } catch (error) {
 *   console.error('Failed to retrieve order:', error);
 * }
 * ```
 */
export const getOrder = async (orderId: string): Promise<Order | null> => {
    try {
        const orderDoc = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderDoc);
        
        if (orderSnap.exists()) {
            const data = orderSnap.data();
            
            // Convert Firestore timestamp to Date object
            return {
                ...data,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
            } as Order;
        }
        
        return null;
    } catch (error) {
        console.error('Error retrieving order:', error);
        throw error;
    }
};

/**
 * Retrieves all orders for a specific user, ordered by creation date (newest first)
 * 
 * Queries Firestore for orders belonging to a user and returns them in chronological order.
 * Handles timestamp conversion and returns empty array if no orders found.
 * 
 * @async
 * @function getUserOrders
 * @param {string} userId - Unique identifier of the user
 * @returns {Promise<Order[]>} Promise that resolves to array of user's orders
 * @throws {Error} When Firestore query fails
 * 
 * @example
 * ```typescript
 * try {
 *   const userOrders = await getUserOrders('user123');
 *   console.log(`Found ${userOrders.length} orders`);
 *   
 *   userOrders.forEach(order => {
 *     console.log(`Order ${order.orderId}: ${order.status}`);
 *   });
 * } catch (error) {
 *   console.error('Failed to retrieve user orders:', error);
 * }
 * ```
 */
export const getUserOrders = async (userId: string): Promise<Order[]> => {
    try {
        const ordersCollection = collection(db, 'orders');
        const userOrdersQuery = query(
            ordersCollection,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(userOrdersQuery);
        
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            
            // Convert Firestore timestamp to Date object
            return {
                ...data,
                orderId: doc.id,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
            } as Order;
        });
    } catch (error) {
        console.error('Error retrieving user orders:', error);
        throw error;
    }
};

/**
 * Updates the status of an existing order
 * 
 * Modifies only the status field of an order in Firestore.
 * Useful for tracking order progression through fulfillment stages.
 * 
 * @async
 * @function updateOrderStatus
 * @param {string} orderId - Unique identifier of the order to update
 * @param {Order['status']} status - New status to set for the order
 * @returns {Promise<boolean>} Promise that resolves to true if update successful
 * @throws {Error} When Firestore update operation fails
 * 
 * @example
 * ```typescript
 * try {
 *   const success = await updateOrderStatus('order123', 'shipped');
 *   if (success) {
 *     console.log('Order status updated successfully');
 *   }
 * } catch (error) {
 *   console.error('Failed to update order status:', error);
 * }
 * ```
 */
export const updateOrderStatus = async (
    orderId: string, 
    status: Order['status']
): Promise<boolean> => {
    try {
        const orderDoc = doc(db, 'orders', orderId);
        await updateDoc(orderDoc, { status });
        
        return true;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};