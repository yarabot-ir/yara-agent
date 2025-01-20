import { createRoot } from 'react-dom/client';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/themes/saga-blue/theme.css';

import './index.css';

import App from './App.tsx';

import { PrimeReactProvider } from 'primereact/api';
import { theme } from './theme/index.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <PrimeReactProvider
    value={{
      ripple: true,
      pt: {
        ...theme,
      },
    }}
  >
    <BrowserRouter>

      <App />
    </BrowserRouter>

  </PrimeReactProvider>
  // </StrictMode>
);
