import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#17171B',
            color: '#F5F5F5',
            border: '1px solid #38383F',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#22C55E',
              secondary: '#17171B',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#17171B',
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
