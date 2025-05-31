import type { Product } from '../../types/product';

export interface CartItem extends Product { 
    // A CartItem has all the properties of a Product (like id, title, price)
  quantity: number; // it also has a quantity property
}

interface CartState {
    items: CartItem[]; 
    //The main part of our cart's state is a property called items, 
    // and this property will hold an array, where each element in the array is a CartItem
}

const initialState: CartState = {
    items: [],
}