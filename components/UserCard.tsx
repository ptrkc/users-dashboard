import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  role: string;
}
export function UserCard({ user }: { user: User }) {
  return (
    <Link
      href={`/users/${user.id}`}
      className="rounded-xl shadow-soft bg-white px-6 py-7 hover:shadow-hard transition-all hover:-translate-y-1"
    >
      <div className="flex justify-between items-center">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden min-w-0">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-xs text-[#7F85A2] whitespace-nowrap text-ellipsis overflow-hidden min-w-0">
            {user.role === 'ADMIN' ? 'Administrator' : 'Developer'}
          </p>
        </div>
        <div className="shrink-0 grow-0 w-7 h-7 p-2 rounded-full text-white bg-[#DBA97C] flex justify-center items-center overflow-hidden ">
          <ArrowRightIcon />
        </div>
      </div>
    </Link>
  );
}
