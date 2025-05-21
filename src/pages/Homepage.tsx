import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard'
import type { Product } from '../types/product';


// Define the Homepage component
const Homepage = () => {

  // Use React Query to fetch and manage product data.
  // <Product[], Error>: Specifies expected success data type and error type.
  const {
    data,       // `data`: Holds Product[] on success, otherwise undefined.
    isLoading,  // `isLoading`: true during initial fetch (no cached data yet).
    isError,    // `isError`: true if queryFn (fetchProducts) threw an error.
    error       // `error`: The actual error object if isError is true, otherwise null.
  } = useQuery<Product[], Error>({ // Options object for the query:

    // queryKey: Unique identifier for this query data in React Query's cache.
    // Used for caching, refetching, sharing across components. Must be an array.
    queryKey: ['products'],

    // queryFn: The async function that fetches the data. Must return a promise.
    // We pass the actual function (fetchProducts) defined in api.ts:
    queryFn: fetchProducts

  });

   // Handle Loading: Show a simple message while data is being fetched initially.
if (isLoading) {
    return <span>Loading products...</span>; // render a spinner component here later
  }
  
  // Handle Error: If the fetch failed (isError is true), show an error message.
  if (isError) {
    // Check if 'error' is an actual Error object to safely access its message property:
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return <span>Error fetching products: {errorMessage}</span>;
  }
  
  // Success State: If we reach this point, isLoading is false and isError is false.
  // This means 'data' (our Product[] array) should be available and ready to use.
  return (
    <div>
      <h1>Our Products</h1>
      <div> {/* Add CSS classes here later for styling the grid/list */}
        {/* Map over the 'data' (Product array) to render each product: */}
        {data.map((product) => (
          <ProductCard key={product.id} product={product} /> 
          // product object is being passed to the ProductCard
        ))}
      </div>
    </div>
  );
};

export default Homepage;