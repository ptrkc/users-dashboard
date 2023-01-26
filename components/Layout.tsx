import { PropsWithChildren } from 'react';
import { Poppins } from '@next/font/google';
import { Sidebar } from '@/components/Sidebar';
import { cn } from '@/utils/classnames';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className={cn(poppins.variable, 'font-sans flex')}>
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}
