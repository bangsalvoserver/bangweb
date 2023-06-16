import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

document.documentElement.lang = (() => {
  switch (navigator.language.toLowerCase()) {
  case 'it-it': return 'it';
  default: return 'en';
  }
})();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <App />
);
