import { Poppins } from '@next/font/google';
import { PropsWithChildren } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export function Layout({ children }: PropsWithChildren) {
  return <div className={`${poppins.variable} font-sans`}>{children}</div>;
}
