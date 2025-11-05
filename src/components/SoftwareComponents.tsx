/**
 * Quantumis Systems Software Components Showcase
 * 
 * This component displays our modular software components as purchasable products.
 * It demonstrates our fractal pricing model where components can be bought:
 * - Individually at granular (premium) pricing
 * - In feature-based middle tiers 
 * - As full-stack bundles with discounts
 * 
 * Each component shown here is actually used in this very application,
 * making the app both a demonstration and a sales platform for itself.
 * 
 * @fileoverview Software component catalog and sales interface
 * @author Quantumis Systems
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { 
  ECOMMERCE_COMPONENTS, 
  BUNDLES, 
  PRODUCT_CATEGORIES,
  PRICING_TIERS,
  calculateBundlePrice 
} from '../config/products';

/**
 * Styling for the software components showcase
 * Uses futuristic glassmorphism design consistent with our brand
 */
const styles = {
  container: {
    color: 'rgba(255, 255, 255, 0.9)'
  },

  categoryTabs: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const
  },

  categoryTab: {
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '25px',
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    fontSize: '14px',
    fontWeight: '500'
  },

  activeTab: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))',
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.4)'
  },

  componentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '25px',
    marginBottom: '40px'
  },

  componentCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '25px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    overflow: 'hidden'
  },

  componentHeader: {
    marginBottom: '15px'
  },

  componentName: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '8px'
  },

  componentDescription: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.5',
    marginBottom: '12px'
  },

  technicalDetails: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
    marginBottom: '20px',
    padding: '8px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },

  featuresList: {
    marginBottom: '20px'
  },

  featureItem: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '6px',
    paddingLeft: '15px',
    position: 'relative' as const
  },

  pricingSection: {
    marginTop: '20px',
    padding: '15px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },

  priceDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },

  granularPrice: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4facfe'
  },

  bundleDiscount: {
    fontSize: '12px',
    color: '#6bcf7f',
    background: 'rgba(107, 207, 127, 0.2)',
    padding: '4px 8px',
    borderRadius: '12px',
    border: '1px solid rgba(107, 207, 127, 0.3)'
  },

  addToCartButton: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  },

  bundleSection: {
    marginTop: '40px',
    padding: '30px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  bundleTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '20px',
    textAlign: 'center' as const
  },

  bundleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '25px'
  },

  bundleCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '25px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  savingsAmount: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#6bcf7f',
    marginLeft: '10px'
  },

  demoCallout: {
    background: 'rgba(255, 255, 255, 0.08)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    marginBottom: '15px',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.9)'
  }
};

/**
 * Software Components Showcase Component
 * 
 * This component serves as both a product catalog and a live demonstration.
 * Users can browse and purchase the very components that power the application
 * they're currently using, creating a meta sales experience.
 */
const SoftwareComponents: React.FC = () => {
  // State management for category filtering and view options
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'components' | 'bundles'>('components');
  
  // Redux dispatch for adding items to cart
  const dispatch = useDispatch();

  // Filter components based on selected category
  const getFilteredComponents = () => {
    if (selectedCategory === 'all') {
      return ECOMMERCE_COMPONENTS; // Only show available components (from README scope)
    }
    return ECOMMERCE_COMPONENTS.filter(component => component.category === selectedCategory);
  };

  /**
   * Add a software component to the shopping cart
   * Converts our component data to the cart item format
   */
  const handleAddToCart = (component: any) => {
    // Convert our software component to a cart item
    // This demonstrates the flexibility of our modular architecture
    const cartItem = {
      id: Date.now(), // Generate unique cart item ID
      title: component.name,
      price: component.granularPrice,
      description: component.description,
      image: `/api/placeholder/300/200?text=${encodeURIComponent(component.name)}`, // Placeholder image
      category: component.category,
      rating: { rate: 4.9, count: 127 }, // High ratings for our quality components
      // Add metadata about the software component (for internal use)
      metadata: {
        componentId: component.id,
        technicalDetails: component.technicalDetails,
        demoComponent: component.demoComponent,
        codeFiles: component.codeFiles,
        bundleDiscount: component.bundleDiscount
      }
    };

    dispatch(addItem(cartItem));
  };

  /**
   * Add a complete bundle to cart with all its components
   */
  const handleAddBundleToCart = (bundle: any) => {
    const bundleItem = {
      id: Date.now(),
      title: bundle.name,
      price: bundle.bundlePrice,
      description: bundle.description,
      image: `/api/placeholder/400/250?text=${encodeURIComponent(bundle.name)}`,
      category: 'bundle',
      rating: { rate: 4.8, count: 89 }, // Excellent ratings for our bundle solutions
      // Bundle-specific metadata (for internal use)
      metadata: {
        bundleId: bundle.id,
        components: bundle.components,
        originalPrice: bundle.originalPrice,
        savings: bundle.savings,
        tier: bundle.tier
      }
    };

    dispatch(addItem(bundleItem));
  };

  /**
   * Format currency for consistent display
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredComponents = getFilteredComponents();

  return (
    <div style={styles.container}>
      
      {/* Category Navigation */}
      <div style={styles.categoryTabs}>
        <button
          style={{
            ...styles.categoryTab,
            ...(selectedCategory === 'all' ? styles.activeTab : {})
          }}
          onClick={() => setSelectedCategory('all')}
        >
          All Components
        </button>
        <button
          style={{
            ...styles.categoryTab,
            ...(selectedCategory === PRODUCT_CATEGORIES.ECOMMERCE ? styles.activeTab : {})
          }}
          onClick={() => setSelectedCategory(PRODUCT_CATEGORIES.ECOMMERCE)}
        >
          E-Commerce
        </button>
        {/* Future categories will be added here as we expand beyond README scope */}
      </div>

      {/* View Mode Toggle */}
      <div style={{...styles.categoryTabs, marginBottom: '20px'}}>
        <button
          style={{
            ...styles.categoryTab,
            ...(viewMode === 'components' ? styles.activeTab : {})
          }}
          onClick={() => setViewMode('components')}
        >
          Individual Components
        </button>
        <button
          style={{
            ...styles.categoryTab,
            ...(viewMode === 'bundles' ? styles.activeTab : {})
          }}
          onClick={() => setViewMode('bundles')}
        >
          Bundle Packages
        </button>
      </div>

      {viewMode === 'components' ? (
        /* Individual Components Display */
        <div style={styles.componentsGrid}>
          {filteredComponents.map((component) => (
            <div key={component.id} style={styles.componentCard} className="glass-section">
              
              {/* Demo Callout - Shows this component is actually used in the app */}
              <div style={styles.demoCallout}>
                🔴 LIVE DEMO: This component powers the <strong>{component.demoComponent}</strong> you're using right now!
              </div>

              <div style={styles.componentHeader}>
                <h3 style={styles.componentName}>{component.name}</h3>
                <p style={styles.componentDescription}>{component.description}</p>
                <div style={styles.technicalDetails}>
                  <strong>Technical Stack:</strong> {component.technicalDetails}
                </div>
              </div>

              {/* Features List */}
              <div style={styles.featuresList}>
                <h4 style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', marginBottom: '10px' }}>
                  ✨ Key Features:
                </h4>
                {component.features.slice(0, 4).map((feature: string, index: number) => (
                  <div key={index} style={styles.featureItem}>
                    • {feature}
                  </div>
                ))}
                {component.features.length > 4 && (
                  <div style={{...styles.featureItem, fontStyle: 'italic'}}>
                    + {component.features.length - 4} more features...
                  </div>
                )}
              </div>

              {/* Pricing Section */}
              <div style={styles.pricingSection}>
                <div style={styles.priceDisplay}>
                  <div>
                    <div style={styles.granularPrice}>{formatCurrency(component.granularPrice)}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
                      Granular pricing
                    </div>
                  </div>
                  <div style={styles.bundleDiscount}>
                    {Math.round(component.bundleDiscount * 100)}% off in bundles
                  </div>
                </div>

                <button
                  style={styles.addToCartButton}
                  onClick={() => handleAddToCart(component)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Add Component to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Bundle Packages Display */
        <div style={styles.bundleSection}>
          <h3 style={styles.bundleTitle}>💰 Full-Stack Bundle Packages</h3>
          <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '30px' }}>
            Save significantly by purchasing complete solutions. Perfect for getting started quickly with proven architectures.
          </p>
          
          <div style={styles.bundleGrid}>
            {BUNDLES.map((bundle) => (
              <div key={bundle.id} style={styles.bundleCard}>
                <h4 style={{ color: 'white', marginBottom: '15px' }}>{bundle.name}</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', marginBottom: '20px' }}>
                  {bundle.description}
                </p>
                
                {/* Bundle Contents */}
                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', marginBottom: '10px' }}>
                    📦 Included Components:
                  </h5>
                  {bundle.components.map((componentId: string) => {
                    const component = ECOMMERCE_COMPONENTS.find(c => c.id === componentId);
                    return component ? (
                      <div key={componentId} style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>
                        • {component.name}
                      </div>
                    ) : null;
                  })}
                </div>

                {/* Pricing */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', textDecoration: 'line-through' }}>
                      {formatCurrency(bundle.originalPrice)}
                    </span>
                    <span style={styles.savingsAmount}>Save {formatCurrency(bundle.savings)}</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4facfe', textAlign: 'center' }}>
                    {formatCurrency(bundle.bundlePrice)}
                  </div>
                </div>

                <button
                  style={styles.addToCartButton}
                  onClick={() => handleAddBundleToCart(bundle)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Add Bundle to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Custom Bundle Calculator */}
          <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
            <h4 style={{ color: 'white', marginBottom: '10px' }}>🧮 Need a Custom Bundle?</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', marginBottom: '15px' }}>
              Mix and match any components to create your perfect solution. Our fractal pricing automatically applies volume discounts.
            </p>
            <button style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #4bc0c0, #9966ff)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}>
              Schedule Free Consultation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftwareComponents;