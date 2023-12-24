import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getSystemLanguage } from './Locale/Registry';
import './index.css';

document.documentElement.lang = getSystemLanguage();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
