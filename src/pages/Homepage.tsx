import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../api';
import ProductCard from '../components/ProductCard'
import type { Product } from '../types/product';

// Define the Homepage component
const Homepage = () => {

  // Initialize with an empty string, which we can use to mean "All Categories"
const [selectedCategory, setSelectedCategory] = useState<string>('');

  // query for all products
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
  } = useQuery<Product[], Error>({
    queryKey: ['products', selectedCategory || 'all'],
    queryFn: async () => {
      if (selectedCategory) {
        return fetchProductsByCategory(selectedCategory);
      } else {
        return fetchProducts();
      }
    },
  });

  // Query for categories
  const {
    data: categoriesData, // Our string[] of categories
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Combined loading state for products
  if (isLoadingProducts || !productsData) {
    return <span>Loading products...</span>;
  }
  
  // Error state for products
  if (isErrorProducts) {
    const errorMessage = errorProducts instanceof Error ? errorProducts.message : 'An unknown error occurred';
    return <span>Error fetching products: {errorMessage}</span>;
  }
  
const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    // For now, let's just log it to see it working:
    console.log("Selected category:", event.target.value);
    // Later, we'll use this value to filter products
  };

   return (
    <div>
      <h1>Our Products</h1>

      {/* Category Dropdown */}
      <div>
        <label htmlFor="category-select">Filter by Category: </label>
        <select
          id="category-select"
          value={selectedCategory} // Controlled component: value is tied to state
          onChange={handleCategoryChange} // Function to call when selection changes
          disabled={isLoadingCategories} // Disable dropdown while categories are loading
        >
          <option value="">All Categories</option> {/* Default option */}
          {/* Render options if categories have loaded successfully */}
          {isErrorCategories && (
            <option value="" disabled>Error loading categories</option>
          )}
          {categoriesData && categoriesData.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize for display */}
            </option>
          ))}
        </select>
        {isLoadingCategories && <p>Loading categories...</p>}
      </div>

      {/* Product Listing Area*/}
      <div style={{ marginTop: '20px' }}>
        {/* Map over 'productsData' to render each product */}
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;