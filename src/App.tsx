/**
 * E-Commerce Application - Modular Template
 * 
 * A complete, modular e-commerce solution with:
 * - Firebase Authentication (email/password)
 * - User profile management (CRUD operations)
 * - Product catalog management (CRUD with Firestore)
 * - Shopping cart (Redux state management)
 * - Order management (creation, history, details)
 * 
 * This template can be customized for any type of online store.
 * 
 * @fileoverview Main application entry point
 * @version 1.0.0
 */

import { useAuth } from "./context/AuthContext";
import AuthForm from "./components/auth/AuthForm";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./components/shopping cart/ShoppingCart";

/**
 * App Styles - Clean, modern design
 */
const appStyles = {
  loggedInContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: '100% 100%'
  },

  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },

  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#333',
    letterSpacing: '-0.5px'
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    color: '#333',
    fontSize: '16px'
  },

  welcomeText: {
    background: 'rgba(102, 126, 234, 0.1)',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    color: '#333'
  },

  mainContent: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },

  section: {
    background: 'white',
    borderRadius: '12px',
    marginBottom: '30px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },

  sectionTitle: {
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center' as const
  }
};

// App styles
const AppStyles = () => (
  <style>
    {`
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      * {
        box-sizing: border-box;
      }

      .main-content {
        animation: contentFadeIn 0.5s ease-out;
      }

      @keyframes contentFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .section:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
      }
    `}
  </style>
);

/**
 * Main Application Content Component
 * Displays authentication or main app based on user login status
 */
const AppContent = () => {
  const { user } = useAuth();

  // Show authentication forms if user is not logged in
  if (!user) {
    return (
      <>
        <AppStyles />
        <AuthForm />
      </>
    );
  }

  // Show main e-commerce app when user is logged in
  return (
    <>
      <AppStyles />
      <div style={appStyles.loggedInContainer}>
        <header style={appStyles.header}>
          <div style={appStyles.logo}>
            🛍️ E-Commerce Store
          </div>
          <div style={appStyles.userInfo}>
            <div style={appStyles.welcomeText}>
              Welcome, {user.email?.split('@')[0]}
            </div>
            <AuthForm />
          </div>
        </header>
        
        <main style={appStyles.mainContent} className="main-content">
          {/* Shopping Cart Section */}
          <div style={appStyles.section} className="section">
            <h2 style={appStyles.sectionTitle}>🛒 Shopping Cart</h2>
            <ShoppingCart />
          </div>

          {/* Product Catalog Section */}
          <div style={appStyles.section} className="section">
            <h2 style={appStyles.sectionTitle}>📦 Products</h2>
            <Homepage />
          </div>
        </main>
      </div>
    </>
  );
};

const App = () => {
  return (
    <AppContent />
  );
};

export default App;