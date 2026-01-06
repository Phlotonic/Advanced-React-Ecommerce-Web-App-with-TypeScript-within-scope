/**
 * Futuristic Authentication Form Component
 * 
 * A stunning glassmorphism authentication interface with parallax effects,
 * gradient backgrounds, and modern animations. Features smooth transitions
 * between login and registration states with a sleek, futuristic design.
 * 
 * @fileoverview Modern Authentication UI with parallax and glassmorphism effects
 * @author Your Team
 * @version 2.0.0
 */

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Login from "./Login";
import Register from "./Register";

/**
 * Modern styling with CSS-in-JS for futuristic authentication interface
 */
const styles = {
  // Parallax background container with black/gold theme
  container: {
    minHeight: '100vh',
    width: '100%',
    background: `
      radial-gradient(circle at 30% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)
    `,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
    padding: '20px',
    boxSizing: 'border-box' as const
  },

  // Parallax gradient overlay that follows cursor
  parallaxOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle 800px at var(--x, 50%) var(--y, 50%), rgba(255, 215, 0, 0.05) 0%, transparent 50%)',
    transition: 'background 0.3s ease',
    pointerEvents: 'none' as const,
    zIndex: 1
  },

  // Floating geometric shapes for subtle parallax effect
  floatingShapes: {
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none' as const,
    zIndex: 2
  },

  shape: {
    position: 'absolute' as const,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.03), rgba(255, 215, 0, 0.08))',
    border: '1px solid rgba(255, 215, 0, 0.1)',
    animation: 'floatSlow 20s ease-in-out infinite',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.05)'
  },

  // Digital glassmorphism card
  authCard: {
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    boxShadow: `
      0 25px 45px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 215, 0, 0.1) inset,
      0 0 30px rgba(255, 215, 0, 0.1)
    `,
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto',
    transform: 'translateY(0)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 10,
    position: 'relative' as const
  },

  // Header styling with 16-bit theme
  header: {
    textAlign: 'center' as const,
    marginBottom: '40px'
  },

  title: {
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffd700, #ffed4e, #ffd700)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '12px',
    letterSpacing: '2px',
    textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
    fontFamily: 'monospace, "Courier New"'
  },

  subtitle: {
    color: 'rgba(255, 215, 0, 0.8)',
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontWeight: '400',
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px'
  },

  // Form container
  formContainer: {
    marginBottom: '30px'
  },

  // Toggle button with digital styling
  toggleButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '8px',
    color: '#ffd700',
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    backdropFilter: 'blur(10px)',
    textAlign: 'center' as const,
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const
  },

  // Logged in state
  welcomeContainer: {
    textAlign: 'center' as const,
    color: '#ffd700'
  },

  welcomeText: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px',
    textShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
  },

  logoutButton: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
    border: '2px solid rgba(255, 215, 0, 0.5)',
    borderRadius: '8px',
    color: '#ffd700',
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
  }
};

// CSS animations as a style tag with digital/16-bit theme
const AnimationStyles = () => (
  <style>
    {`
      @keyframes floatSlow {
        0%, 100% { 
          transform: translateY(0px) translateX(0px); 
          opacity: 0.1;
        }
        25% { 
          transform: translateY(-40px) translateX(20px); 
          opacity: 0.2;
        }
        50% { 
          transform: translateY(-20px) translateX(-15px); 
          opacity: 0.15;
        }
        75% { 
          transform: translateY(-60px) translateX(10px); 
          opacity: 0.25;
        }
      }

      @keyframes digitalGlow {
        0%, 100% { 
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.1),
                      0 0 0 1px rgba(255, 215, 0, 0.2) inset;
        }
        50% { 
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.2),
                      0 0 0 2px rgba(255, 215, 0, 0.3) inset;
        }
      }

      .auth-card {
        animation: digitalGlow 3s ease-in-out infinite;
      }

      .auth-card:hover {
        transform: translateY(-3px);
        border-color: rgba(255, 215, 0, 0.6);
        box-shadow: 0 35px 60px rgba(0, 0, 0, 0.7),
                    0 0 0 2px rgba(255, 215, 0, 0.3) inset,
                    0 0 40px rgba(255, 215, 0, 0.2);
      }

      .toggle-btn:hover {
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1));
        border-color: rgba(255, 215, 0, 0.6);
        transform: translateY(-2px);
        box-shadow: 0 0 25px rgba(255, 215, 0, 0.3);
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
      }

      .logout-btn:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.2));
        border-color: rgba(255, 215, 0, 0.8);
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
        text-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .auth-card {
          padding: 20px !important;
          margin: 10px !important;
          max-width: 95vw !important;
        }
      }

      @media (max-width: 480px) {
        .auth-card {
          padding: 15px !important;
          border-radius: 12px !important;
        }
      }
    `}
  </style>
);

const AuthForm: React.FC = () => {
  const { user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Mouse tracking for cursor-following parallax gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      setMousePosition({ x, y });
      
      // Update CSS custom properties for the parallax gradient
      document.documentElement.style.setProperty('--x', `${x}%`);
      document.documentElement.style.setProperty('--y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Reset to center when component unmounts
      document.documentElement.style.setProperty('--x', '50%');
      document.documentElement.style.setProperty('--y', '50%');
    };
  }, []);

  // Generate subtle floating shapes for background ambiance
  const FloatingShapes = () => {
    const shapes = [];
    for (let i = 0; i < 8; i++) { // Reduced from 15 to 8 for subtlety
      const size = Math.random() * 120 + 60; // Larger, more subtle shapes
      const delay = Math.random() * 10 + 5; // Slower start delays
      const duration = Math.random() * 10 + 15; // Much slower animations (15-25s)
      
      shapes.push(
        <div
          key={i}
          style={{
            ...styles.shape,
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            // Subtle parallax movement based on cursor
            transform: `translate(${mousePosition.x * 0.002}px, ${mousePosition.y * 0.002}px)`
          }}
        />
      );
    }
    return <div style={styles.floatingShapes}>{shapes}</div>;
  };

  if (user) {
    return (
      <>
        <AnimationStyles />
        <div style={styles.container}>
          <div style={styles.parallaxOverlay} />
          <FloatingShapes />
          <div style={styles.authCard} className="auth-card">
            <div style={styles.welcomeContainer}>
              <div style={styles.welcomeText}>
                Welcome back, {user.email?.split('@')[0]}!
              </div>
              <button
                style={styles.logoutButton}
                className="logout-btn"
                onClick={logout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimationStyles />
      <div style={styles.container}>
        <div style={styles.parallaxOverlay} />
        <FloatingShapes />
        <div style={styles.authCard} className="auth-card">
          <div style={styles.header}>
            <h1 style={styles.title}>
              {showRegister ? 'Join Us' : 'Welcome Back'}
            </h1>
            <p style={styles.subtitle}>
              {showRegister 
                ? 'Create your account to start shopping' 
                : 'Sign in to your account'}
            </p>
          </div>
          
          <div style={styles.formContainer}>
            {showRegister ? <Register /> : <Login />}
          </div>
          
          <button
            style={styles.toggleButton}
            className="toggle-btn"
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister 
              ? "Already have an account? Sign In" 
              : "New here? Create Account"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
