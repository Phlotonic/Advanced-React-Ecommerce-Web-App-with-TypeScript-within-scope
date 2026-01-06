/**
 * Futuristic Register Component
 * 
 * Modern registration form with glassmorphism styling, advanced animations,
 * and cyberpunk-inspired visual effects. Features floating labels,
 * password strength indicator, and interactive hover states.
 * 
 * @fileoverview Futuristic Registration Form Component
 * @author Your Team
 * @version 2.0.0
 */

import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

/**
 * Digital/16-bit styling with black and gold theme
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
    background: 'rgba(0, 0, 0, 0.6)',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '8px',
    color: '#ffd700',
    fontSize: 'clamp(14px, 3vw, 16px)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px'
  },

  inputFocused: {
    border: '2px solid rgba(255, 215, 0, 0.7)',
    background: 'rgba(0, 0, 0, 0.8)',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3), inset 0 0 10px rgba(255, 215, 0, 0.1)',
    transform: 'translateY(-2px)'
  },

  label: {
    position: 'absolute' as const,
    left: '20px',
    top: '16px',
    color: 'rgba(255, 215, 0, 0.6)',
    fontSize: 'clamp(14px, 3vw, 16px)',
    transition: 'all 0.3s ease',
    pointerEvents: 'none' as const,
    background: 'transparent',
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px'
  },

  labelFocused: {
    top: '-12px',
    fontSize: 'clamp(10px, 2.5vw, 12px)',
    color: '#ffd700',
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))',
    padding: '4px 8px',
    borderRadius: '4px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
  },

  passwordStrength: {
    height: '6px',
    borderRadius: '3px',
    marginTop: '8px',
    transition: 'all 0.4s ease',
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 215, 0, 0.2)'
  },

  strengthWeak: {
    background: 'linear-gradient(90deg, #ff4444, #ff6666)',
    boxShadow: '0 0 10px rgba(255, 68, 68, 0.3)'
  },

  strengthMedium: {
    background: 'linear-gradient(90deg, #ff8800, #ffaa00)',
    boxShadow: '0 0 10px rgba(255, 136, 0, 0.3)'
  },

  strengthStrong: {
    background: 'linear-gradient(90deg, #ffd700, #ffed4e)',
    boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
  },

  strengthText: {
    fontSize: 'clamp(10px, 2.5vw, 12px)',
    marginTop: '4px',
    color: 'rgba(255, 215, 0, 0.8)',
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px'
  },

  submitButton: {
    padding: '16px',
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
    border: '2px solid rgba(255, 215, 0, 0.5)',
    borderRadius: '8px',
    color: '#ffd700',
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    overflow: 'hidden',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    fontFamily: 'monospace, "Courier New"',
    boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
  },

  error: {
    color: '#ff4444',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    marginTop: '8px',
    padding: '12px',
    background: 'rgba(255, 68, 68, 0.1)',
    border: '1px solid rgba(255, 68, 68, 0.4)',
    borderRadius: '6px',
    backdropFilter: 'blur(10px)',
    animation: 'errorSlide 0.3s ease-out',
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px'
  },

  success: {
    color: '#ffd700',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    marginTop: '8px',
    padding: '12px',
    background: 'rgba(255, 215, 0, 0.1)',
    border: '1px solid rgba(255, 215, 0, 0.4)',
    borderRadius: '6px',
    backdropFilter: 'blur(10px)',
    animation: 'successSlide 0.3s ease-out',
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px'
  },

  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    borderTop: '2px solid #ffd700',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  }
};

// Additional CSS animations
const RegisterStyles = () => (
  <style>
    {`
      @keyframes errorSlide {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes successSlide {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .digital-input:focus::placeholder {
        color: transparent;
      }

      .register-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
      }

      .register-btn:hover::before {
        left: 100%;
      }

      .register-btn:hover {
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
      }
    `}
  </style>
);

const Register: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Password strength calculation
  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const getStrengthStyle = (strength: number) => {
    if (strength <= 2) return styles.strengthWeak;
    if (strength <= 3) return styles.strengthMedium;
    return styles.strengthStrong;
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return 'Weak password';
    if (strength <= 3) return 'Medium strength';
    return 'Strong password';
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    try {
      await register(email, password);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
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

  const passwordStrength = calculatePasswordStrength(password);

  return (
    <>
      <RegisterStyles />
      <form onSubmit={handleRegister} style={styles.form}>
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
            className="digital-input"
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
            className="digital-input"
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
          {password && (
            <>
              <div
                style={{
                  ...styles.passwordStrength,
                  ...getStrengthStyle(passwordStrength),
                  width: `${(passwordStrength / 5) * 100}%`
                }}
              />
              <div style={styles.strengthText}>
                {getStrengthText(passwordStrength)}
              </div>
            </>
          )}
        </div>

        <div style={styles.inputGroup}>
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setFocusedField('confirmPassword')}
            onBlur={() => setFocusedField(confirmPassword ? 'confirmPassword' : null)}
            style={{
              ...styles.input,
              ...(focusedField === 'confirmPassword' || confirmPassword ? styles.inputFocused : {}),
              ...(confirmPassword && password !== confirmPassword ? { border: '2px solid #ff4444' } : {})
            }}
            className="digital-input"
            required
          />
          <label
            style={{
              ...styles.label,
              ...(focusedField === 'confirmPassword' || confirmPassword ? styles.labelFocused : {})
            }}
          >
            Confirm Password
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={styles.submitButton}
          className="register-btn"
          onClick={createRipple}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading && <div style={styles.loadingSpinner}></div>}
            {loading ? 'Creating Account...' : 'Create Account'}
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

export default Register;
