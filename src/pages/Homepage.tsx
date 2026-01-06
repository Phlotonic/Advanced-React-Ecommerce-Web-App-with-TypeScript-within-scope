import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  getAllProducts, 
  getAllCategories, 
  getProductsByCategory 
} from '../utils/productApi';
import ProductCard from '../components/ProductCard'
import type { Product } from '../types/product';

/**
 * Homepage component - displays product catalog from Firebase
 * Implements requirements: fetch products from Firestore with category filtering
 */
const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Query for Firebase products
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
  } = useQuery<Product[], Error>({
    queryKey: ['products', selectedCategory || 'all'],
    queryFn: async () => {
      if (selectedCategory) {
        return await getProductsByCategory(selectedCategory);
      } else {
        return await getAllProducts();
      }
    },
    retry: 2,
    retryDelay: 1000
  });

  // Query for categories
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      return await getAllCategories();
    },
    retry: 2,
    retryDelay: 1000
  });

  // Loading state
  if (isLoadingProducts) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        color: '#667eea',
        fontSize: '18px'
      }}>
        <div>Loading products...</div>
      </div>
    );
  }

  // Error state
  if (isErrorProducts) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        color: '#dc3545',
        fontSize: '16px',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div>Error loading products</div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {errorProducts?.message || 'Please try again later'}
        </div>
      </div>
    );
  }
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const displayProducts = productsData || [];

  return (
    <div style={{
      padding: '20px'
    }}>
      <h1 style={{
        color: '#333',
        textAlign: 'center',
        fontSize: '28px',
        marginBottom: '30px'
      }}>
        Product Catalog
      </h1>

      {/* Category Dropdown */}
      <div style={{
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <label 
          htmlFor="category-select"
          style={{
            color: '#333',
            fontSize: '16px'
          }}
        >
          Filter by Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          disabled={isLoadingCategories}
          style={{
            padding: '10px 16px',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '6px',
            color: '#333',
            fontSize: '14px',
            cursor: 'pointer',
            minWidth: '200px'
          }}
        >
          <option value="">All Categories</option>
          {isErrorCategories && (
            <option value="" disabled>Error loading categories</option>
          )}
          {categoriesData && categoriesData.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        {isLoadingCategories && (
          <p style={{
            color: '#666',
            fontSize: '14px'
          }}>
            Loading categories...
          </p>
        )}
      </div>

      {/* Product Listing Area*/}
      <div style={{ 
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {displayProducts.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            color: '#666',
            fontSize: '18px',
            padding: '40px',
            border: '1px dashed #ddd',
            borderRadius: '8px'
          }}>
            No products available
          </div>
        ) : (
          displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Homepage;