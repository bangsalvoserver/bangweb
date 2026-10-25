import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GameStatsScene from './Scenes/GameStats/GameStats';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <GameStatsScene />
  </StrictMode>
);
