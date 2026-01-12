/**
 * Error Boundary Component
 * 
 * Catches and displays errors during rendering to prevent blank screens
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('❌ Error caught by Error Boundary:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          fontFamily: 'monospace'
        }}>
          <div style={{
            maxWidth: '600px',
            padding: '20px',
            border: '2px solid #ff6b6b',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}>
            <h1 style={{ color: '#ff6b6b' }}>Something went wrong</h1>
            <p style={{ color: '#ccc', marginBottom: '20px' }}>
              The application encountered an error. Please check the console for details.
            </p>
            <pre style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '15px',
              borderRadius: '4px',
              overflow: 'auto',
              color: '#ffed4e',
              fontSize: '12px'
            }}>
              {this.state.error?.message}
              {'\n\n'}
              {this.state.error?.stack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
