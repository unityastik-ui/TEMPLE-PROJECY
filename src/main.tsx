import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

const isStandaloneDemo =
  typeof __IS_STANDALONE_DEMO__ !== 'undefined' && __IS_STANDALONE_DEMO__;

if (!isStandaloneDemo && 'serviceWorker' in navigator) {
  registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        // Check for updated guide content silently when back online
        window.addEventListener('online', () => {
          void registration.update();
        });
      }
    },
  });
}

createRoot(document.getElementById('root')!).render(<App />);
