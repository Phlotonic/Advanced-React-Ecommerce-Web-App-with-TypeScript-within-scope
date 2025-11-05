/**
 * Order History Component
 * 
 * This component displays a user's complete order history with detailed information
 * about each order including products, status, and order management capabilities.
 * Integrates with the orderApi to fetch and display user orders.
 * 
 * @fileoverview Order History Display Component with Firebase Integration
 * @author Your Team
 * @version 1.0.0
 */

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUserOrders, Order } from '../../utils/orderApi';

/**
 * Styling for the order history interface
 * Provides clean, modern styling for order display and status indicators
 */
const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        color: '#333',
        marginBottom: '30px',
        fontSize: '24px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
    },
    orderCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    orderHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        flexWrap: 'wrap' as const,
        gap: '10px'
    },
    orderId: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333'
    },
    orderDate: {
        color: '#666',
        fontSize: '14px'
    },
    statusBadge: {
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase' as const
    },
    productList: {
        marginBottom: '15px'
    },
    productItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        borderBottom: '1px solid #f0f0f0'
    },
    productInfo: {
        flex: 1
    },
    productName: {
        fontWeight: 'bold',
        color: '#333'
    },
    productDetails: {
        color: '#666',
        fontSize: '14px'
    },
    totalPrice: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#2e7d32',
        textAlign: 'right' as const
    },
    shippingAddress: {
        color: '#666',
        fontSize: '14px',
        marginTop: '10px',
        fontStyle: 'italic'
    },
    loading: {
        textAlign: 'center' as const,
        padding: '40px',
        color: '#666'
    },
    error: {
        color: '#d32f2f',
        backgroundColor: '#ffebee',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
    },
    noOrders: {
        textAlign: 'center' as const,
        padding: '40px',
        color: '#666',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
    }
};

/**
 * Returns appropriate styling for order status badges
 * 
 * @param status - The order status
 * @returns CSS properties for the status badge
 */
const getStatusBadgeStyle = (status: Order['status']) => {
    const baseStyle = styles.statusBadge;
    
    switch (status) {
        case 'pending':
            return { ...baseStyle, backgroundColor: '#fff3e0', color: '#ef6c00' };
        case 'confirmed':
            return { ...baseStyle, backgroundColor: '#e3f2fd', color: '#1976d2' };
        case 'shipped':
            return { ...baseStyle, backgroundColor: '#f3e5f5', color: '#7b1fa2' };
        case 'delivered':
            return { ...baseStyle, backgroundColor: '#e8f5e8', color: '#2e7d32' };
        case 'cancelled':
            return { ...baseStyle, backgroundColor: '#ffebee', color: '#d32f2f' };
        default:
            return { ...baseStyle, backgroundColor: '#f5f5f5', color: '#666' };
    }
};

/**
 * Order History Component
 * 
 * Displays a comprehensive list of all orders for the authenticated user.
 * Features include:
 * - Real-time order fetching from Firebase
 * - Order status indicators with color coding
 * - Detailed product information for each order
 * - Error handling and loading states
 * - Responsive design for mobile and desktop
 * 
 * @component
 * @returns {JSX.Element} Rendered order history interface
 * 
 * @example
 * ```tsx
 * // Usage in a parent component
 * import OrderHistory from './components/orders/OrderHistory';
 * 
 * function UserDashboard() {
 *   return (
 *     <div>
 *       <h1>My Account</h1>
 *       <OrderHistory />
 *     </div>
 *   );
 * }
 * ```
 */
const OrderHistory: React.FC = () => {
    // Component state management
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    
    // Get current user from authentication context
    const authContext = useContext(AuthContext);
    const user = authContext?.user;

    /**
     * Fetches order history for the current user
     * Handles loading states and error scenarios
     */
    const fetchOrderHistory = async () => {
        if (!user) {
            setError('Please log in to view your order history');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            const userOrders = await getUserOrders(user.uid);
            setOrders(userOrders);
        } catch (err) {
            console.error('Error fetching order history:', err);
            setError('Failed to load order history. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Effect hook to load order history when component mounts or user changes
     */
    useEffect(() => {
        fetchOrderHistory();
    }, [user]);

    /**
     * Formats a date object to a user-friendly string
     * 
     * @param date - Date to format
     * @returns Formatted date string
     */
    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    /**
     * Formats currency values for display
     * 
     * @param amount - Numeric amount to format
     * @returns Formatted currency string
     */
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Loading state
    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading your order history...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.error}>{error}</div>
                <button 
                    onClick={fetchOrderHistory}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    // No orders state
    if (orders.length === 0) {
        return (
            <div style={styles.container}>
                <h2 style={styles.header}>Order History</h2>
                <div style={styles.noOrders}>
                    <p>You haven't placed any orders yet.</p>
                    <p>Start shopping to see your order history here!</p>
                </div>
            </div>
        );
    }

    // Main render with orders
    return (
        <div style={styles.container}>
            <h2 style={styles.header}>
                Order History ({orders.length} {orders.length === 1 ? 'order' : 'orders'})
            </h2>
            
            {orders.map((order) => (
                <div key={order.orderId} style={styles.orderCard}>
                    {/* Order Header */}
                    <div style={styles.orderHeader}>
                        <div>
                            <div style={styles.orderId}>Order #{order.orderId}</div>
                            <div style={styles.orderDate}>
                                Placed on {formatDate(order.createdAt)}
                            </div>
                        </div>
                        <div style={getStatusBadgeStyle(order.status)}>
                            {order.status}
                        </div>
                    </div>

                    {/* Product List */}
                    <div style={styles.productList}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Items Ordered:</h4>
                        {order.products.map((product, index) => (
                            <div key={`${product.productId}_${index}`} style={styles.productItem}>
                                <div style={styles.productInfo}>
                                    <div style={styles.productName}>{product.name}</div>
                                    <div style={styles.productDetails}>
                                        Quantity: {product.quantity} × {formatCurrency(product.price)}
                                    </div>
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#333' }}>
                                    {formatCurrency(product.price * product.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Total and Shipping */}
                    <div style={styles.totalPrice}>
                        Total: {formatCurrency(order.totalPrice)}
                    </div>
                    
                    <div style={styles.shippingAddress}>
                        <strong>Shipping to:</strong> {order.shippingAddress}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;