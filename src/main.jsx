// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Sprite, Container, TilingSprite } from 'pixi.js';
import { extend } from '@pixi/react';

extend({ Sprite, Container, TilingSprite });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
