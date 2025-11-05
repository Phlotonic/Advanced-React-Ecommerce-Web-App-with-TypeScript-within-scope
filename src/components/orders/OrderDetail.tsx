/**
 * Order Details Component
 * 
 * This component displays detailed information for a single order,
 * including all products, pricing, status, and shipping information.
 * Fetches order data from Firebase using the orderApi.
 * 
 * @fileoverview Individual Order Details Display Component
 * @author Your Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { getOrder, Order } from '../../utils/orderApi';

/**
 * Props for the OrderDetail component
 */
interface OrderDetailProps {
    /** The unique identifier of the order to display */
    orderId: string;
    /** Optional callback when user wants to go back */
    onBack?: () => void;
}

/**
 * Styling for the order detail interface
 */
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e0e0e0'
    },
    backButton: {
        padding: '8px 16px',
        backgroundColor: '#f5f5f5',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    orderInfo: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
    },
    infoCard: {
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
    },
    infoLabel: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#666',
        textTransform: 'uppercase' as const,
        marginBottom: '5px'
    },
    infoValue: {
        fontSize: '16px',
        color: '#333'
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase' as const,
        display: 'inline-block'
    },
    section: {
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff'
    },
    sectionTitle: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '10px'
    },
    productItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 0',
        borderBottom: '1px solid #f0f0f0'
    },
    productInfo: {
        flex: 1
    },
    productName: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: '16px',
        marginBottom: '4px'
    },
    productDetails: {
        color: '#666',
        fontSize: '14px'
    },
    productPrice: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: '16px'
    },
    totalSection: {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        borderTop: '3px solid #1976d2'
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
    },
    totalAmount: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2e7d32'
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
        textAlign: 'center' as const
    },
    notFound: {
        textAlign: 'center' as const,
        padding: '40px',
        color: '#666',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
    }
};

/**
 * Returns appropriate styling for order status badges
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
 * Order Detail Component
 * 
 * Displays comprehensive information for a single order including:
 * - Order identification and status
 * - Creation date and timestamp
 * - Complete product listing with prices
 * - Total amount calculation
 * - Shipping address information
 * - Loading and error states
 * 
 * @component
 * @param {OrderDetailProps} props - Component props including orderId and optional onBack callback
 * @returns {JSX.Element} Rendered order detail interface
 * 
 * @example
 * ```tsx
 * // Usage in a parent component
 * import OrderDetail from './components/orders/OrderDetail';
 * 
 * function OrderPage() {
 *   const [selectedOrderId, setSelectedOrderId] = useState('order123');
 * 
 *   return (
 *     <OrderDetail 
 *       orderId={selectedOrderId}
 *       onBack={() => setSelectedOrderId('')}
 *     />
 *   );
 * }
 * ```
 */
const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, onBack }) => {
    // Component state
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    /**
     * Fetches order details from Firebase
     */
    const fetchOrderDetail = async () => {
        try {
            setLoading(true);
            setError('');
            
            const orderData = await getOrder(orderId);
            setOrder(orderData);
            
            if (!orderData) {
                setError('Order not found');
            }
        } catch (err) {
            console.error('Error fetching order detail:', err);
            setError('Failed to load order details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Effect hook to load order details when orderId changes
     */
    useEffect(() => {
        if (orderId) {
            fetchOrderDetail();
        }
    }, [orderId]);

    /**
     * Formats a date object to a user-friendly string
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
     */
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    /**
     * Calculates subtotal before any taxes or fees
     */
    const calculateSubtotal = (): number => {
        if (!order) return 0;
        return order.products.reduce((sum, product) => {
            return sum + (product.price * product.quantity);
        }, 0);
    };

    // Loading state
    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading order details...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div style={styles.container}>
                {onBack && (
                    <button style={styles.backButton} onClick={onBack}>
                        ← Back to Orders
                    </button>
                )}
                <div style={styles.error}>{error}</div>
            </div>
        );
    }

    // Order not found
    if (!order) {
        return (
            <div style={styles.container}>
                {onBack && (
                    <button style={styles.backButton} onClick={onBack}>
                        ← Back to Orders
                    </button>
                )}
                <div style={styles.notFound}>
                    <p>Order not found</p>
                    <p>The order you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    // Main render with order details
    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={{ margin: 0, color: '#333' }}>Order Details</h2>
                {onBack && (
                    <button style={styles.backButton} onClick={onBack}>
                        ← Back to Orders
                    </button>
                )}
            </div>

            {/* Order Information Grid */}
            <div style={styles.orderInfo}>
                <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Order ID</div>
                    <div style={styles.infoValue}>{order.orderId}</div>
                </div>
                
                <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Status</div>
                    <div style={getStatusBadgeStyle(order.status)}>
                        {order.status}
                    </div>
                </div>
                
                <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Order Date</div>
                    <div style={styles.infoValue}>{formatDate(order.createdAt)}</div>
                </div>
                
                <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Total Amount</div>
                    <div style={{...styles.infoValue, color: '#2e7d32', fontWeight: 'bold'}}>
                        {formatCurrency(order.totalPrice)}
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Items Ordered ({order.products.length} items)</h3>
                {order.products.map((product, index) => (
                    <div key={`${product.productId}_${index}`} style={styles.productItem}>
                        <div style={styles.productInfo}>
                            <div style={styles.productName}>{product.name}</div>
                            <div style={styles.productDetails}>
                                Product ID: {product.productId}<br />
                                Unit Price: {formatCurrency(product.price)} × {product.quantity}
                            </div>
                        </div>
                        <div style={styles.productPrice}>
                            {formatCurrency(product.price * product.quantity)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Shipping Information */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Shipping Information</h3>
                <p style={{ margin: 0, color: '#333', fontSize: '16px' }}>
                    <strong>Delivery Address:</strong><br />
                    {order.shippingAddress}
                </p>
            </div>

            {/* Order Total Breakdown */}
            <div style={styles.totalSection}>
                <h3 style={styles.sectionTitle}>Order Summary</h3>
                <div style={styles.totalRow}>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div style={styles.totalRow}>
                    <span>Tax & Fees:</span>
                    <span>{formatCurrency(order.totalPrice - calculateSubtotal())}</span>
                </div>
                <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #ddd' }} />
                <div style={{...styles.totalRow, ...styles.totalAmount}}>
                    <span>Total:</span>
                    <span>{formatCurrency(order.totalPrice)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;