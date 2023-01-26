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
    <div className={cn(poppins.variable, 'font-sans flex absolute inset-0')}>
      <Sidebar />
      <div className="w-full overflow-auto">{children}</div>
    </div>
  );
}
