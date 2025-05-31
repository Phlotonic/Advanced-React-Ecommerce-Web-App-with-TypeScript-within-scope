import type { Product } from './types/product';

export const fetchProducts = async (): Promise<Product[]> => { // Promises Product[] array

    const response = await fetch('https://fakestoreapi.com/products'); // Fetches products from fakestore

    if (!response.ok) { // Check if the ok property of the response object is false
        throw new Error('Network response was not ok: ${response.status} ${response.statusText}');
    }

    const data: Product[] = await response.json(); // This method 
    // reads the response body and returns a Promise that resolves 
    // with the JavaScript object obtained by parsing the body text 
    // as JSON.

    return data; // Fulfill the promise by returning the parsed data
};

export const fetchCategories = async (): Promise<string[]> => { // Returns a promise of a string array
  const response = await fetch('https://fakestoreapi.com/products/categories'); // Use the categories endpoint

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
  }

  const data: string[] = await response.json(); // The data will be an array of strings
  return data; // Return the array of category strings
};

export const fetchProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
  }

  const data: Product[] = await response.json();
  return data;
}