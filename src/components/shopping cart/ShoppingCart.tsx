import React, { useState } from 'react';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart, updateQuantity } from '../../features/cart/cartSlice';
import Checkout from '../checkout/Checkout';

const ShoppingCart = () => {
    const [showCheckout, setShowCheckout] = useState(false);
    
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    
    const totalPrice = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    
    const totalItems = cartItems.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);
    
    const handleQuantityChange = (id: string | number, newQuantity: number) => {
        if (newQuantity <= 0) {
            dispatch(removeItem(id));
        } else {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };
    
    const proceedToCheckout = () => {
        setShowCheckout(true);
    };
    
    const backToCart = () => {
        setShowCheckout(false);
    };

    const cartStyles = {
        container: {
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
        },
        
        title: {
            color: '#ffd700',
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: '700',
            fontFamily: 'monospace, "Courier New"',
            letterSpacing: '2px',
            textShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
            textAlign: 'center' as const,
            marginBottom: '20px'
        },
        
        emptyCart: {
            color: 'rgba(255, 215, 0, 0.8)',
            fontSize: 'clamp(16px, 3vw, 18px)',
            fontFamily: 'monospace, "Courier New"',
            textAlign: 'center' as const,
            padding: '40px',
            border: '1px dashed rgba(255, 215, 0, 0.3)',
            borderRadius: '8px'
        },
        
        cartItem: {
            background: 'rgba(255, 215, 0, 0.1)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '10px',
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            alignItems: 'center',
            gap: '15px'
        },
        
        itemInfo: {
            color: 'rgba(255, 215, 0, 0.9)',
            fontFamily: 'monospace, "Courier New"'
        },
        
        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        
        quantityButton: {
            background: 'rgba(255, 215, 0, 0.2)',
            border: '1px solid rgba(255, 215, 0, 0.5)',
            borderRadius: '4px',
            color: '#ffd700',
            padding: '5px 10px',
            cursor: 'pointer',
            fontFamily: 'monospace, "Courier New"'
        },
        
        removeButton: {
            background: 'rgba(255, 107, 107, 0.2)',
            border: '1px solid rgba(255, 107, 107, 0.5)',
            borderRadius: '4px',
            color: '#ff6b6b',
            padding: '8px 12px',
            cursor: 'pointer',
            fontFamily: 'monospace, "Courier New"'
        },
        
        totals: {
            background: 'rgba(255, 215, 0, 0.1)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '20px',
            color: '#ffd700',
            fontFamily: 'monospace, "Courier New"',
            textAlign: 'center' as const
        },
        
        checkoutButton: {
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
            border: '2px solid rgba(255, 215, 0, 0.5)',
            borderRadius: '8px',
            color: '#ffd700',
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            fontFamily: 'monospace, "Courier New"',
            letterSpacing: '1px',
            marginTop: '15px',
            width: '100%',
            transition: 'all 0.3s ease'
        },
        
        backButton: {
            background: 'rgba(128, 128, 128, 0.2)',
            border: '1px solid rgba(128, 128, 128, 0.5)',
            borderRadius: '6px',
            color: '#ccc',
            padding: '10px 20px',
            cursor: 'pointer',
            fontFamily: 'monospace, "Courier New"',
            marginBottom: '20px'
        }
    };

    // If showing checkout, render the checkout component
    if (showCheckout) {
        return (
            <div style={cartStyles.container}>
                <button 
                    style={cartStyles.backButton}
                    onClick={backToCart}
                >
                    ← Back to Cart
                </button>
                <Checkout />
            </div>
        );
    }

    return (
        <div style={cartStyles.container}>
            <h2 style={cartStyles.title}>🛒 Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
                <div style={cartStyles.emptyCart}>
                    Your cart is empty. Add some products to get started!
                </div>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} style={cartStyles.cartItem}>
                            <div style={cartStyles.itemInfo}>
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                    {item.title}
                                </div>
                                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                                    ${item.price.toFixed(2)} each
                                </div>
                            </div>
                            
                            <div style={cartStyles.quantityControls}>
                                <button 
                                    style={cartStyles.quantityButton}
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span style={{ color: '#ffd700', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                                    {item.quantity}
                                </span>
                                <button 
                                    style={cartStyles.quantityButton}
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            
                            <button 
                                style={cartStyles.removeButton}
                                onClick={() => dispatch(removeItem(item.id))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    
                    <div style={cartStyles.totals}>
                        <div style={{ fontSize: '18px', marginBottom: '10px' }}>
                            Total Items: {totalItems}
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
                            Total Price: ${totalPrice.toFixed(2)}
                        </div>
                        <button 
                            style={cartStyles.checkoutButton}
                            onClick={proceedToCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}





export default ShoppingCart;