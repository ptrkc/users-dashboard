import { ReactNode } from 'react';
import { cn } from '@/utils/classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function NavIconLink({ href, icon }: { href: string; icon: ReactNode }) {
  const router = useRouter();
  const isActive = router.asPath.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        isActive ? 'text-white bg-[#3E6BEC]' : 'text-[#A4A8BB] bg-[#F7F7F7]',
        'rounded-xl flex justify-center items-center h-12 w-12 transition-colors'
      )}
    >
      <span className="flex justify-center items-center w-7 h-7">{icon}</span>
    </Link>
  );
}
