import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

// Load state from sessionStorage function
const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('cart');
        if (serializedState === null) {
            return undefined; // No state saved
        }
        // Only need the 'cart' part, 
        // rest of state will be initialized by reducers
        const parsed = JSON.parse(serializedState);
        console.log('✅ Loaded cart state from sessionStorage:', parsed);
        return { cart: parsed };
    } catch (err) {
        console.warn('⚠️  Failed to load cart state from sessionStorage:', err);
        return undefined; // Errors treated as if no state is saved
    }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState, // Pass the preloadedState to the store
});

store.subscribe(() => {
try { 
    // Runs every time the state changes
    const state = store.getState();
    const serializedState = JSON.stringify(state.cart);
    // Save the 'cart' part of the state to sessionStorage
    sessionStorage.setItem('cart', serializedState);
    console.log('✅ Saved cart state to sessionStorage');
} catch (error) {
    // If saving fails, we don't want to crash the app
    // Log a warning to the console for developers to see:
    console.warn('⚠️  Could not save cart state to sessionStorage', error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;