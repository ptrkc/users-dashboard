import { useContext } from 'react';
import { ToastContext } from '@/context/ToastContext';

export function useToast() {
  const { toast, setToast } = useContext(ToastContext);

  return { toast, setToast };
}
