import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TrackingScene from './Scenes/Tracking/Tracking';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <TrackingScene />
  </StrictMode>
);
