import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { getSystemLanguage } from './Locale/Registry';
import GameLogTest from './GameLogTest';
import './index.css';

document.documentElement.lang = getSystemLanguage();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <GameLogTest />
  </StrictMode>
);
