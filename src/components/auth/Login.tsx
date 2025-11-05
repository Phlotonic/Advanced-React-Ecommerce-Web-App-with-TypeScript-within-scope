/**
 * Futuristic Login Component
 * 
 * Modern login form with glassmorphism styling, smooth animations,
 * and cyberpunk-inspired visual effects. Features floating labels,
 * gradient borders, and interactive hover states.
 * 
 * @fileoverview Futuristic Login Form Component
 * @author Your Team
 * @version 2.0.0
 */

import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

/**
 * Futuristic form styling with advanced CSS effects
 */
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  },

  inputGroup: {
    position: 'relative' as const
  },

  input: {
    width: '100%',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    boxSizing: 'border-box' as const
  },

  inputFocused: {
    border: '1px solid rgba(255, 255, 255, 0.5)',
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(138, 43, 226, 0.2)',
    transform: 'translateY(-2px)'
  },

  placeholder: {
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '16px'
    }
  },

  label: {
    position: 'absolute' as const,
    left: '20px',
    top: '16px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    pointerEvents: 'none' as const,
    background: 'transparent'
  },

  labelFocused: {
    top: '-8px',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.9)',
    background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))',
    padding: '2px 8px',
    borderRadius: '6px',
    backdropFilter: 'blur(10px)'
  },

  submitButton: {
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    overflow: 'hidden',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px'
  },

  submitButtonHover: {
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
  },

  buttonRipple: {
    position: 'absolute' as const,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(0)',
    animation: 'ripple 0.6s linear'
  },

  error: {
    color: '#ff6b6b',
    fontSize: '14px',
    marginTop: '8px',
    padding: '12px',
    background: 'rgba(255, 107, 107, 0.1)',
    border: '1px solid rgba(255, 107, 107, 0.3)',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)',
    animation: 'errorSlide 0.3s ease-out'
  },

  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  }
};

// Additional CSS animations
const LoginStyles = () => (
  <style>
    {`
      @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
      }

      @keyframes errorSlide {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .futuristic-input:focus::placeholder {
        color: transparent;
      }

      .submit-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
      }

      .submit-btn:hover::before {
        left: 100%;
      }
    `}
  </style>
);

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <>
      <LoginStyles />
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            ref={emailRef}
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(email ? 'email' : null)}
            style={{
              ...styles.input,
              ...(focusedField === 'email' || email ? styles.inputFocused : {})
            }}
            className="futuristic-input"
            required
          />
          <label
            style={{
              ...styles.label,
              ...(focusedField === 'email' || email ? styles.labelFocused : {})
            }}
          >
            Email Address
          </label>
        </div>

        <div style={styles.inputGroup}>
          <input
            ref={passwordRef}
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(password ? 'password' : null)}
            style={{
              ...styles.input,
              ...(focusedField === 'password' || password ? styles.inputFocused : {})
            }}
            className="futuristic-input"
            required
          />
          <label
            style={{
              ...styles.label,
              ...(focusedField === 'password' || password ? styles.labelFocused : {})
            }}
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={styles.submitButton}
          className="submit-btn"
          onClick={createRipple}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading && <div style={styles.loadingSpinner}></div>}
            {loading ? 'Authenticating...' : 'Sign In'}
          </div>
        </button>

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}
      </form>
    </>
  );
};

export default Login;
