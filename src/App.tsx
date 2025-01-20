import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkModeProvider } from './context/DarkModeContext.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat.tsx';
import { ToastProvider } from './context/ToastProvider.tsx';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="chat" />} />
          </Routes>
        </ToastProvider>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
