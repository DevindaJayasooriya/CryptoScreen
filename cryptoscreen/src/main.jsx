import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import CryptoContextProvider from './context/CryptoContext'; 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CryptoContextProvider>
      <App />
    </CryptoContextProvider>
  </BrowserRouter>
);