import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css';
import App from './App.jsx';

const app = (
  <StrictMode>
    <BrowserRouter><App /></BrowserRouter>
    <Analytics />
    <SpeedInsights />
  </StrictMode>
);

const root = document.getElementById('root');
if (root.dataset.prerendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);
