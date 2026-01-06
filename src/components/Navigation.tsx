/**
 * Navigation Component for E-Commerce Application
 * 
 * Provides main navigation between different sections of the application
 * with clean modern styling
 * 
 * @fileoverview Main navigation component
 * @version 1.0.0
 */

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navStyles = {
    nav: {
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '2px solid rgba(255, 215, 0, 0.3)',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      gap: '15px'
    },
    
    logo: {
      color: '#ffd700',
      fontSize: 'clamp(20px, 4vw, 28px)',
      fontWeight: '700',
      fontFamily: 'monospace, "Courier New"',
      letterSpacing: '2px',
      textShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
      cursor: 'pointer'
    },
    
    navButtons: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap' as const,
      alignItems: 'center'
    },
    
    navButton: {
      background: 'rgba(255, 215, 0, 0.1)',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      borderRadius: '6px',
      color: '#ffd700',
      padding: '10px 16px',
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      fontFamily: 'monospace, "Courier New"',
      letterSpacing: '1px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative' as const
    },
    
    activeButton: {
      background: 'rgba(255, 215, 0, 0.2)',
      borderColor: 'rgba(255, 215, 0, 0.6)',
      boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)'
    },
    
    cartBadge: {
      position: 'absolute' as const,
      top: '-8px',
      right: '-8px',
      background: '#ff6b6b',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '10px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 10px rgba(255, 107, 107, 0.5)'
    },
    
    userInfo: {
      color: 'rgba(255, 215, 0, 0.8)',
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      fontFamily: 'monospace, "Courier New"',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    
    logoutButton: {
      background: 'rgba(255, 107, 107, 0.1)',
      border: '1px solid rgba(255, 107, 107, 0.3)',
      borderRadius: '6px',
      color: '#ff6b6b',
      padding: '8px 12px',
      fontSize: 'clamp(11px, 2vw, 13px)',
      fontFamily: 'monospace, "Courier New"',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  const getButtonStyle = (view: string) => ({
    ...navStyles.navButton,
    ...(currentView === view ? navStyles.activeButton : {})
  });

  return (
    <>
      <style>
        {`
          .nav-button:hover {
            background: rgba(255, 215, 0, 0.2) !important;
            border-color: rgba(255, 215, 0, 0.6) !important;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.4) !important;
            transform: translateY(-2px);
          }
          
          .logout-button:hover {
            background: rgba(255, 107, 107, 0.2) !important;
            border-color: rgba(255, 107, 107, 0.6) !important;
            transform: translateY(-2px);
          }
        `}
      </style>
      <nav style={navStyles.nav}>
        <div 
          style={navStyles.logo}
          onClick={() => onViewChange('home')}
        >
          🛍️ E-Commerce Store
        </div>
        
        <div style={navStyles.navButtons}>
          <button
            style={getButtonStyle('home')}
            onClick={() => onViewChange('home')}
            className="nav-button"
          >
            🏠 Home
          </button>
          
          <button
            style={getButtonStyle('products')}
            onClick={() => onViewChange('products')}
            className="nav-button"
          >
            🛍️ Products
          </button>
          
          <button
            style={getButtonStyle('cart')}
            onClick={() => onViewChange('cart')}
            className="nav-button"
          >
            🛒 Cart
            {cartItemCount > 0 && (
              <span style={navStyles.cartBadge}>
                {cartItemCount}
              </span>
            )}
          </button>
          
          <button
            style={getButtonStyle('orders')}
            onClick={() => onViewChange('orders')}
            className="nav-button"
          >
            📋 Orders
          </button>
          
          <button
            style={getButtonStyle('profile')}
            onClick={() => onViewChange('profile')}
            className="nav-button"
          >
            👤 Profile
          </button>
        </div>
        
        <div style={navStyles.userInfo}>
          <span>Welcome, {user?.email?.split('@')[0]}</span>
          <button
            style={navStyles.logoutButton}
            onClick={logout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;