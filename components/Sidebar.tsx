import Link from 'next/link';
import Image from 'next/image';
import {
  ClientsIcon,
  SettingsIcon,
  SignOutIcon,
  UserIcon,
} from '@/components/Icons';
import { NavIconLink } from '@/components/NavIconLink';
import logo from 'public/logo.png';

export function Sidebar() {
  return (
    <div className="w-14 sm:w-24 min-w-24 shrink-0">
      <nav className="fixed top-0 bottom-0 w-14 sm:w-24 bg-white flex flex-col justify-between items-center py-12">
        <div className="flex flex-col gap-12 items-center">
          <Link href="/">
            <Image src={logo} alt="Company logo" />
          </Link>
          <NavIconLink href="/clients" icon={<ClientsIcon />} />
          <NavIconLink href="/users" icon={<UserIcon />} />
          <NavIconLink href="/settings" icon={<SettingsIcon />} />
        </div>
        <NavIconLink href="#" icon={<SignOutIcon />} />
      </nav>
    </div>
  );
}
