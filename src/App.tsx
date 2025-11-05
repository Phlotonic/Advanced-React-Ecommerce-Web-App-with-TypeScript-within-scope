/**
 * Quantumis Systems - E-Commerce Platform & Software Component Marketplace
 * 
 * This application serves a dual purpose:
 * 1. Demonstrates a complete e-commerce solution (per README requirements)
 * 2. Showcases and sells the very software components used to build it
 * 
 * BUSINESS MODEL:
 * - Sells modular software components in E-Commerce, E-Learning, and DevSecOps
 * - Fractally structured: granular pricing, feature-based tiers, full-stack bundles
 * - Each component shown can be purchased individually or as part of discounted bundles
 * - Offers free consultations and maintenance retainers (cheaper with bundles)
 * - The app IS the product - demonstrating modular, scalable architecture
 * 
 * TECHNICAL ARCHITECTURE:
 * - All code is extensively commented for non-technical understanding
 * - Modular structure mirrors the products we sell
 * - Stays within README guardrails while adding business value
 * - Future expansions (E-Learning, DevSecOps) are local-scope only
 * 
 * @fileoverview Main application for Quantumis Systems platform
 * @author Quantumis Systems Team
 * @version 1.0.0
 */

import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthForm from "./components/auth/AuthForm";
import Homepage from "./pages/Homepage";
import SoftwareComponents from "./components/SoftwareComponents";
import ShoppingCart from "./components/shopping cart/ShoppingCart";

/**
 * Futuristic App Styles
 */
const appStyles = {
  loggedInContainer: {
    minHeight: '100vh',
    background: `
      linear-gradient(135deg, #1e3c72 0%, #2a5298 100%),
      linear-gradient(45deg, #667eea 0%, #764ba2 100%)
    `,
    backgroundSize: '400% 400%, 200% 200%',
    animation: 'appGradientShift 20s ease infinite'
  },

  header: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
  },

  logo: {
    fontSize: '28px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px'
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px'
  },

  welcomeText: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)'
  },

  mainContent: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },

  section: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    marginBottom: '30px',
    padding: '30px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
  },

  sectionTitle: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center' as const
  }
};

// Futuristic app animations
const AppStyles = () => (
  <style>
    {`
      @keyframes appGradientShift {
        0%, 100% { background-position: 0% 50%, 0% 50%; }
        25% { background-position: 100% 50%, 50% 0%; }
        50% { background-position: 50% 100%, 100% 50%; }
        75% { background-position: 25% 0%, 50% 100%; }
      }

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
        animation: contentFadeIn 0.8s ease-out;
      }

      @keyframes contentFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .glass-section:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    `}
  </style>
);

/**
 * Main Application Content Component
 * Renders the main e-commerce interface when user is authenticated
 */
const AppContent = () => {
  const { user } = useAuth();

  // Show authentication forms if user is not logged in
  if (!user) {
    return <AuthForm />;
  }

  // Show main e-commerce app when user is logged in
  return (
    <>
      <AppStyles />
      <div style={appStyles.loggedInContainer}>
        <header style={appStyles.header}>
          <div style={appStyles.logo}>
            ⚡ Quantumis Systems
          </div>
          <div style={appStyles.userInfo}>
            <div style={appStyles.welcomeText}>
              Welcome, {user.email?.split('@')[0]}
            </div>
            <AuthForm /> {/* This will show the logout button when user is logged in */}
          </div>
        </header>
        
        <main style={appStyles.mainContent} className="main-content">
          {/* Business Model Showcase - This section explains what Quantumis Systems offers */}
          <div style={appStyles.section} className="glass-section">
            <h2 style={appStyles.sectionTitle}>🔬 Modular Software Architecture</h2>
            <div style={{ color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center', marginBottom: '20px' }}>
              <p>This application showcases our fractal component architecture. Every feature you see can be purchased individually or as part of discounted bundles.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  <h4 style={{ color: '#4facfe', margin: '0 0 10px 0' }}>🛒 E-Commerce</h4>
                  <p style={{ fontSize: '14px', margin: 0 }}>Authentication, shopping carts, order management, user profiles</p>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  <h4 style={{ color: '#6bcf7f', margin: '0 0 10px 0' }}>📚 E-Learning</h4>
                  <p style={{ fontSize: '14px', margin: 0 }}>Course management, progress tracking, analytics dashboards</p>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  <h4 style={{ color: '#ff6b6b', margin: '0 0 10px 0' }}>� DevSecOps</h4>
                  <p style={{ fontSize: '14px', margin: 0 }}>CI/CD pipelines, monitoring suites, security components</p>
                </div>
              </div>
            </div>
          </div>

          {/* Component Catalog - Shows our actual software products */}
          <div style={appStyles.section} className="glass-section">
            <h2 style={appStyles.sectionTitle}>🛍️ Software Component Catalog</h2>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', marginBottom: '15px' }}>
              <p>Browse our modular software components. Each component you see here is actually powering this very application!</p>
            </div>
            <SoftwareComponents />
          </div>
          
          {/* Shopping Experience - Demonstrates our e-commerce capabilities */}
          <div style={appStyles.section} className="glass-section">
            <h2 style={appStyles.sectionTitle}>🛒 Shopping Experience Demo</h2>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', marginBottom: '15px' }}>
              <p>Experience our Redux-powered shopping cart in action. This very component can be yours!</p>
            </div>
            <ShoppingCart />
          </div>

          {/* Original E-commerce Demo - Shows we maintain README requirements */}
          <div style={appStyles.section} className="glass-section">
            <h2 style={appStyles.sectionTitle}>📋 Original E-Commerce Demo</h2>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', marginBottom: '15px' }}>
              <p>This demonstrates the original e-commerce functionality from the project requirements, powered by our modular components.</p>
            </div>
            <Homepage />
          </div>

          {/* Services Section - Consultation and maintenance offerings */}
          <div style={appStyles.section} className="glass-section">
            <h2 style={appStyles.sectionTitle}>🤝 Professional Services</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              
              {/* Free Consultation */}
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(75, 192, 192, 0.2), rgba(153, 102, 255, 0.2))', 
                padding: '25px', 
                borderRadius: '15px', 
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ color: '#4bc0c0', margin: '0 0 15px 0' }}>🆓 Free Consultation</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '15px' }}>
                  30-minute complimentary session to discuss your software architecture needs and explore our modular solutions.
                </p>
                <ul style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', paddingLeft: '20px' }}>
                  <li>Architecture assessment</li>
                  <li>Technology recommendations</li>
                  <li>Custom solution design</li>
                </ul>
                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #4bc0c0, #9966ff)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '15px'
                }}>
                  Schedule Free Consultation
                </button>
              </div>

              {/* Maintenance Retainer */}
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(255, 159, 64, 0.2), rgba(255, 99, 132, 0.2))', 
                padding: '25px', 
                borderRadius: '15px', 
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ color: '#ff9f40', margin: '0 0 15px 0' }}>🔧 Maintenance Retainer</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '15px' }}>
                  Monthly maintenance and support for your software components. Cheaper when bundled with component purchases.
                </p>
                <ul style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', paddingLeft: '20px' }}>
                  <li>Security updates & patches</li>
                  <li>Performance optimization</li>
                  <li>Priority support access</li>
                </ul>
                <div style={{ marginTop: '15px' }}>
                  <span style={{ color: '#ff9f40', fontSize: '24px', fontWeight: 'bold' }}>$299</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>/month</span>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;