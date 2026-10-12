import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import './App.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("HCD Connect Application Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-4">
          <div className="card shadow-sm p-4 text-center border" style={{ maxWidth: '480px', borderRadius: '16px', borderColor: 'var(--hcd-border)' }}>
            <div className="text-warning mb-3">
              <i className="bi bi-exclamation-octagon-fill fs-1"></i>
            </div>
            <h4 className="fw-bold mb-2" style={{ color: 'var(--hcd-charcoal)' }}>Application Notice</h4>
            <p className="small mb-3" style={{ color: 'var(--hcd-body)' }}>
              {this.state.error?.message || 'An unexpected error occurred while loading components.'}
            </p>
            <button 
              type="button"
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
