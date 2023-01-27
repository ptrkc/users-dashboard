import { PropsWithChildren, useState } from 'react';
import { Poppins } from '@next/font/google';
import { Sidebar } from '@/components/Sidebar';
import { cn } from '@/utils/classnames';
import { ToastProvider } from '@/context/ToastContext';
import { Toast } from './Toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export function Layout({ children }: PropsWithChildren) {
  return (
    <ToastProvider>
      <div className={cn(poppins.variable, 'font-sans flex absolute inset-0')}>
        <Sidebar />
        <div className="w-full overflow-auto">{children}</div>
        <Toast />
      </div>
    </ToastProvider>
  );
}
