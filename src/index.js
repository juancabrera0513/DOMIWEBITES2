import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import emailjs from '@emailjs/browser';

const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'QomFGcKltdQDXhSSp';
emailjs.init({ publicKey: PUBLIC_KEY });



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
