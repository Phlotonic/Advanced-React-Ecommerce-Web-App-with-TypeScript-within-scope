import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

export interface CartItem extends Product { 
    // A CartItem has all the properties of a Product via product.ts (id, title, price, etc)
  quantity: number; // it also has a quantity property
}

interface CartState {
    items: CartItem[]; 
    //The main part of our cart's state is a property called items, 
    // and this property will hold an array, where each element in the array is a CartItem
}

const initialState: CartState = {
    items: [],
} // Our cart's initial state is an empty array of items

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState, 
    reducers: { // Define the functions that can change our state
        addItem: (state: CartState, action: PayloadAction<Product>) => {
            // We are defining a reducer named 'addItem'
    // Redux Toolkit automatically gives it 'state' and 'action' as arguments
    // 'PayloadAction<Product>' is a special TypeScript type from Redux Toolkit
    // It tells TypeScript that the 'action.payload' for this specific reducer
    // will be a single 'Product' object
            
            const productToAdd = action.payload;
            // Getting the product that was passed in from the action's payload

            const existingItem = state.items.find(item => item.id === productToAdd.id);
            // Checking if the product already exists in the cart using
            // .find() on our state.items array
            // This will return the item if found, or 'undefined' if not

            if (existingItem) {
                // The item is already in the cart, just increase the qty by 1:
                existingItem.quantity++;
            } else {
                // The item is not in the cart, add it as a new entry:
                state.items.push({ ...productToAdd, quantity: 1 });
            }
        },
        removeItem: (state: CartState, action: PayloadAction<string | number>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        }, // "Replace the current items array with a new array 
        // that has filtered out the item we want to remove."

        updateQuantity: (state: CartState, action: PayloadAction<{id: string | number, quantity: number}>) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
// to dispatch the action to the store
export default cartSlice.reducer;
// combine all of the slice reducers into the single main app reducer
// to export the reducer itself