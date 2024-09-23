import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { getSystemLanguage } from './Locale/Registry';
import './index.css';
import TrackingScene from './Scenes/Tracking/Tracking';

document.documentElement.lang = getSystemLanguage();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <TrackingScene />
  </StrictMode>
);
