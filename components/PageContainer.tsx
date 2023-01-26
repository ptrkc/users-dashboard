import { PropsWithChildren } from 'react';
import Head from 'next/head';
import { cn } from '@/utils/classnames';

export function PageContainer({
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
