import { cn } from '@/utils/classnames';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

export default function PageContainer({
  className,
  children,
  title,
}: PropsWithChildren<{ className?: string; title: string }>) {
  return (
    <div className={cn('p-2', className)}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
}
