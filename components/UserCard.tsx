import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';
import { cn } from '@/utils/classnames';
import { PropsWithChildren } from 'react';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  role: string;
}

const skeletonClasses =
  'select-none bg-gray-400 animate-pulse rounded-full inline-block text-transparent text-opacity-0';

function Wrapper({
  user,
  children,
  className,
}: PropsWithChildren<{ user?: User; className: string }>) {
  if (!user) return <div className={className}>{children}</div>;

  return (
    <Link href={`/users/${user.id}`} className={className}>
      {children}
    </Link>
  );
}

export function UserCard({ user }: { user?: User }) {
  const name = !user
    ? 'Username placeholder'
    : `${user.first_name} ${user.last_name}`;
  const role = user?.role === 'ADMIN' ? 'Administrator' : 'Developer';
  return (
    <Wrapper
      user={user}
      className="rounded-xl shadow-soft bg-white px-6 py-7 hover:shadow-hard transition-all hover:-translate-y-1"
    >
      <div className="flex justify-between items-center">
        <div className="min-w-0">
          <h2
            className={cn(
              'text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden min-w-0',
              !user && skeletonClasses
            )}
          >
            {name}
          </h2>
          <p
            className={cn(
              'text-xs text-[#7F85A2] whitespace-nowrap text-ellipsis overflow-hidden min-w-0',
              !user && skeletonClasses
            )}
          >
            {role}
          </p>
        </div>
        <div
          className={cn(
            'shrink-0 grow-0 w-7 h-7 p-2 rounded-full text-white bg-[#DBA97C] flex justify-center items-center overflow-hidden',
            !user && skeletonClasses
          )}
        >
          <ArrowRightIcon />
        </div>
      </div>
    </Wrapper>
  );
}
