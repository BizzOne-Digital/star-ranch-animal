import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// A new deploy removes old hashed chunk files. If a tab that was open before
// the deploy tries to lazy-load one of those old chunks, reload once to pick
// up the current build instead of leaving the user on a blank page.
window.addEventListener('vite:preloadError', () => {
  const key = 'sr_chunk_reload';
  if (!sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, '1');
    window.location.reload();
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
