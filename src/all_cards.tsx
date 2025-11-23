import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AllCardsScene from './Scenes/AllCards/AllCards';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <AllCardsScene />
  </StrictMode>
);
