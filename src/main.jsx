import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initSentry, SentryErrorBoundary } from './lib/sentry.js'

initSentry();

function ErrorFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#374151' }}>
      <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Something went wrong. Please refresh.</p>
      <button onClick={() => window.location.reload()}
        style={{ padding: '0.5rem 1.5rem', borderRadius: '0.75rem', border: 'none', background: '#6366f1', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
        Refresh
      </button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SentryErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </SentryErrorBoundary>
  </StrictMode>,
)
