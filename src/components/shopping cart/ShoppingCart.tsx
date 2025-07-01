import React from 'react';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../features/cart/cartSlice';

const ShoppingCart = () => {

    const cartItems = useSelector((state: RootState) => state.cart.items);
    // This function tells useSelector: "Please give me the entire 
    // application state (and I know its type is RootState), 
    // I will look inside it, go into the cart slice, 
    // and return the items array."
    const dispatch = useDispatch();
    // to get the dispatch function
    const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);}, 0);
    // Reduce the cartItems array to get the total price of each item
    const totalItems = cartItems.reduce((sum, item) => {
    return sum + item.quantity;}, 0);
    // Reduce the cartItems array to get the total item count
    const handleCheckout = () => {
        dispatch(clearCart());
        sessionStorage.removeItem('cart');
    }

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
                        <button onClick={ () => dispatch( removeItem(item.id) ) }>Remove</button>
                    </li>
                ))}
            </ul>
            )}
            Total Items: {totalItems} <br/>
            Total Price: ${totalPrice.toFixed(2)}
            {cartItems.length > 0 && ( // Only show the button if the cart isn't empty
            <button onClick={handleCheckout} style={{ marginTop: '10px' }}>Checkout</button>
                )}
        </div>
    )
}





export default ShoppingCart;