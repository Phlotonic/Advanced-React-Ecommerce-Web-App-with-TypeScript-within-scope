import React from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const ShoppingCart = () => {

    const cartItems = useSelector((state: RootState) => state.cart.items);
    // This function tells useSelector: "Please give me the entire 
    // application state (and I know its type is RootState), 
    // I will look inside it, go into the cart slice, 
    // and return the items array."
    
    return (
        <div>
            <h2>Shopping Cart</h2>
            {/* Conditional ternary operator logic: */}
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.title} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            )}
        </div>
    )
}





export default ShoppingCart;