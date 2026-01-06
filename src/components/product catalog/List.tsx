/**
 * Product Catalog List Component
 * 
 * Displays all products from Firestore in a responsive grid layout.
 * Integrates with the product API to fetch, create, update, and delete products.
 * Implements full CRUD operations as required by Part 4 of the assignment.
 * 
 * @fileoverview Product catalog listing with CRUD operations
 * @author Your Team
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../utils/productApi';
import ProductCard from '../ProductCard';

interface ListProps {
  onProductsLoaded?: (products: Product[]) => void;
}

const List: React.FC<ListProps> = ({ onProductsLoaded }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  });

  // Load all products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
        if (onProductsLoaded) {
          onProductsLoaded(fetchedProducts);
        }
        setError(null);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [onProductsLoaded]);

  // Handle product creation
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productId = await createProduct({
        title: newProduct.title,
        price: newProduct.price,
        description: newProduct.description,
        category: newProduct.category,
        image: newProduct.image,
        rating: newProduct.rating
      });

      // Reload products after creation
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
      
      // Reset form
      setNewProduct({
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 }
      });
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
    }
  };

  // Handle product update
  const handleUpdateProduct = async (productId: string | number, updatedData: Partial<Product>) => {
    try {
      await updateProduct(String(productId), updatedData);
      
      // Reload products after update
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId: string | number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(String(productId));
        
        // Reload products after deletion
        const updatedProducts = await getAllProducts();
        setProducts(updatedProducts);
      } catch (err) {
        console.error('Error deleting product:', err);
        setError('Failed to delete product. Please try again.');
      }
    }
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      marginBottom: '30px',
      borderBottom: '2px solid rgba(255, 215, 0, 0.3)',
      paddingBottom: '20px'
    },
    title: {
      color: '#ffd700',
      fontSize: '28px',
      fontWeight: 'bold' as const,
      fontFamily: 'monospace, "Courier New"',
      letterSpacing: '2px',
      textShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
    },
    createButton: {
      padding: '12px 24px',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      border: '2px solid rgba(255, 215, 0, 0.5)',
      color: '#ffd700',
      borderRadius: '8px',
      cursor: 'pointer' as const,
      fontWeight: 'bold' as const,
      transition: 'all 0.3s ease',
      fontSize: '14px'
    },
    form: {
      background: 'rgba(0, 0, 0, 0.5)',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '30px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      display: 'grid' as const,
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '15px'
    },
    input: {
      padding: '12px',
      backgroundColor: 'rgba(255, 215, 0, 0.05)',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      color: '#ffd700',
      borderRadius: '6px',
      fontFamily: 'monospace',
      fontSize: '14px'
    },
    textarea: {
      padding: '12px',
      backgroundColor: 'rgba(255, 215, 0, 0.05)',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      color: '#ffd700',
      borderRadius: '6px',
      fontFamily: 'monospace',
      fontSize: '14px',
      minHeight: '100px',
      gridColumn: '1 / -1' as const
    },
    submitButton: {
      gridColumn: '1 / -1' as const,
      padding: '12px',
      backgroundColor: 'rgba(255, 215, 0, 0.15)',
      border: '2px solid rgba(255, 215, 0, 0.5)',
      color: '#ffd700',
      borderRadius: '6px',
      cursor: 'pointer' as const,
      fontWeight: 'bold' as const,
      transition: 'all 0.3s ease',
      fontSize: '14px'
    },
    grid: {
      display: 'grid' as const,
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    },
    loadingMessage: {
      color: '#ffd700',
      textAlign: 'center' as const,
      padding: '40px',
      fontSize: '18px',
      fontFamily: 'monospace'
    },
    errorMessage: {
      color: '#ff6b6b',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid rgba(255, 107, 107, 0.3)'
    }
  };

  if (loading) {
    return <div style={styles.loadingMessage}>Loading products...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Product Catalog</h1>
        <button
          style={styles.createButton}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {error && <div style={styles.errorMessage}>{error}</div>}

      {showCreateForm && (
        <form style={styles.form} onSubmit={handleCreateProduct}>
          <input
            style={styles.input}
            type="text"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            required
            step="0.01"
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            required
          />
          <textarea
            style={styles.textarea}
            placeholder="Product Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
          />
          <button style={styles.submitButton} type="submit">
            Create Product
          </button>
        </form>
      )}

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div style={styles.loadingMessage}>
          No products available. Create your first product!
        </div>
      )}
    </div>
  );
};

export default List;
