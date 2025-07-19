import { createRoot } from 'react-dom/client';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

import './index.css';

import App from './App.tsx';

import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme/index.tsx';

function fixPlainClassStrings(obj: any) {
  const result: any = {};
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      result[key] = { className: value };
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      result[key] = fixPlainClassStrings(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <PrimeReactProvider
    value={{
      ripple: true,
      pt: fixPlainClassStrings(theme),
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PrimeReactProvider>
  // </StrictMode>
);
