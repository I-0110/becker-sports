import Link from 'next/link';
import NavLinks from '@/app/ui/admin-dashboard/nav-links';
import SportsLogo from '@/app/ui/sports-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className='dark:p-[2px] dark:bg-gradient-to-r dark:from-chief-300 dark:to-chief-100 rounded-md shadow-md dark:shadow-chief-300/75 mb-2'>
        <Link
            className="flex h-20 items-center justify-start rounded-md bg-chief-300 dark:bg-chief-400 p-4 md:h-40"
            href="/"
        >
          <div className="w-full">
            <SportsLogo />
          </div>
        </Link>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-chief-200 dark:bg-chief-400 dark:border-2 dark:border-chief-200 md:block" />
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/admin-dashboard/login' });
            }}
          >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-chief-200 p-3 text-sm font-medium hover:bg-chief-300 hover:text-chief-50 dark:text-chief-400 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
