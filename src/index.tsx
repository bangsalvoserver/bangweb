import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { getSystemLanguage } from './Locale/Registry';

document.documentElement.lang = getSystemLanguage();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <App />
);
