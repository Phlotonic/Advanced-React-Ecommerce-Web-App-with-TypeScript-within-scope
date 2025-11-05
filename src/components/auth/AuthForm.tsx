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
  // Parallax background container
  container: {
    minHeight: '100vh',
    background: `
      linear-gradient(135deg, #667eea 0%, #764ba2 100%),
      linear-gradient(45deg, #f093fb 0%, #f5576c 100%),
      linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)
    `,
    backgroundSize: '400% 400%, 200% 200%, 300% 300%',
    animation: 'gradientShift 15s ease infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden'
  },

  // Floating geometric shapes for parallax effect
  floatingShapes: {
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none' as const
  },

  shape: {
    position: 'absolute' as const,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: 'float 6s ease-in-out infinite'
  },

  // Glassmorphism card
  authCard: {
    background: 'rgba(255, 255, 255, 0.125)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: `
      0 25px 45px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 8px 32px rgba(31, 38, 135, 0.37)
    `,
    padding: '40px',
    width: '450px',
    maxWidth: '90vw',
    transform: 'translateY(0)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: 'cardFloat 4s ease-in-out infinite',
    zIndex: 10
  },

  // Header styling
  header: {
    textAlign: 'center' as const,
    marginBottom: '40px'
  },

  title: {
    fontSize: '32px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '12px',
    letterSpacing: '-0.5px'
  },

  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    fontWeight: '400'
  },

  // Form container
  formContainer: {
    marginBottom: '30px'
  },

  // Toggle button
  toggleButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    textAlign: 'center' as const
  },

  toggleButtonHover: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
  },

  // Logged in state
  welcomeContainer: {
    textAlign: 'center' as const,
    color: 'white'
  },

  welcomeText: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  logoutButton: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(238, 90, 36, 0.3)'
  }
};

// CSS animations as a style tag
const AnimationStyles = () => (
  <style>
    {`
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%, 0% 50%, 0% 50%; }
        25% { background-position: 100% 50%, 50% 0%, 25% 75%; }
        50% { background-position: 50% 100%, 100% 50%, 75% 25%; }
        75% { background-position: 25% 0%, 50% 100%, 50% 50%; }
      }

      @keyframes parallaxFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }

      @keyframes cardFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); opacity: 0.3; }
        33% { transform: translateY(-30px); opacity: 0.6; }
        66% { transform: translateY(-15px); opacity: 0.4; }
      }

      .auth-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 35px 60px rgba(0, 0, 0, 0.15),
                    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                    0 12px 40px rgba(31, 38, 135, 0.5);
      }

      .toggle-btn:hover {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }

      .logout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(238, 90, 36, 0.4);
      }
    `}
  </style>
);

const AuthForm: React.FC = () => {
  const { user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate floating shapes for parallax background
  const FloatingShapes = () => {
    const shapes = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 100 + 20;
      const delay = Math.random() * 6;
      const duration = Math.random() * 4 + 4;
      
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
            transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`
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
        <FloatingShapes />
        <div style={styles.authCard} className="auth-card">
          <div style={styles.header}>
            <h1 style={styles.title}>
              {showRegister ? 'Join Quantumis' : 'Welcome Back'}
            </h1>
            <p style={styles.subtitle}>
              {showRegister 
                ? 'Access modular software components & consultation services' 
                : 'Build better software with our fractally structured solutions'}
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
