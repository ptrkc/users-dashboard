import { useToast } from '@/hooks/useToast';
import { cn } from '@/utils/classnames';
import { useEffect, useState } from 'react';

const toastClasses = {
  ok: 'bg-[#52d8b0]',
  error: 'bg-red-400',
};

export function Toast() {
  const { toast } = useToast();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dismiss = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!toast?.message) return;

    setIsOpen(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(dismiss, 4000);
    setTimeoutId(id);

    return () => {
      clearTimeout(id);
    };
  }, [toast]);

  if (!toast?.message) return null;

  return (
    <button
      onClick={dismiss}
      className={cn(
        'fixed rounded-xl shadow-hard bg-white py-2 px-4 transition-opacity bottom-4 left-0 right-0 mx-auto',
        isOpen ? 'opacity-100' : 'opacity-0',
        toast.type && toastClasses[toast.type]
      )}
    >
      {toast.message && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </button>
  );
}
