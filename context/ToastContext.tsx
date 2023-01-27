import { createContext, PropsWithChildren, useState } from 'react';

interface ToastContextProps {
  toast: { message: string; type: 'error' | 'ok' | '' };
  setToast: (toast: { message: string; type: 'error' | 'ok' | '' }) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toast: { message: '', type: '' },
  setToast: () => {},
});
export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<{
    message: string;
    type: 'error' | 'ok' | '';
  }>({ message: '', type: '' });

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
}
