// ToastContext.tsx
import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

type ToastContextType = {
  showToast: (
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toastRef = useRef<Toast>(null);


  const showToast = (
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string
  ) => {
    toastRef.current?.show({ severity, summary, detail });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast
        position="top-center"
        pt={{
          content: {
            className: 'flex justify-start gap-x-2 items-center  !py-2 !px-4  ',
          },
          text: {
            className:
              'text-base font-normal flex flex-col flex-1 grow shrink !ml-4',
          },
          icon: { className: '!w-6 !h-6 text-lg mr-2' },
        }}
        ref={toastRef}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
