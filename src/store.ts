import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

// store operates as "headquarters" for our Redux rules

const rootReducer = {
    cart: cartReducer,
};

export const store = configureStore({
    reducer: rootReducer,

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;