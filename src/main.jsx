import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import './styles/tokens.css';
import './styles/base.css';
import './styles/navigation.css';
import './styles/sections.css';
import './styles/featured.css';
import './styles/wishlist.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </StrictMode>,
);
