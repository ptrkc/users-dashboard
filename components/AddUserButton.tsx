import Link from 'next/link';
import { PlusIcon } from '@/components/Icons';

export function AddUserButton() {
  return (
    <Link
      href="/users/add"
      className="group flex justify-center items-center gap-2 bg-white text-sm font-semibold rounded-xl shadow-soft transition-all h-14 p-3 hover:shadow-hard hover:-translate-y-1"
    >
      <div className="text-white bg-[#3E6BEC] h-8 w-8 -skew-x-3 transition-all rounded-lg p-2 group-hover:skew-x-3">
        <PlusIcon />
      </div>
      <span>add new user</span>
    </Link>
  );
}
