'use client';

import {
  HomeIcon,
  PencilSquareIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { 
    name: 'Home', 
    href: '/admin-dashboard', 
    icon: HomeIcon 
  },
  { 
    name: 'Posts', 
    href: '/admin-dashboard/posts', 
    icon: PencilSquareIcon 
  },
  { 
    name: 'Subscribers', 
    href: '/admin-dashboard/subscribers', 
    icon: UserGroupIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-chief-200 p-3 text-sm font-medium hover:bg-chief-100 hover:text-chief-400 dark:bg-chief-400 dark:border-2 dark:border-chief-200 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-chief-300 text-chief-50 dark:bg-chief-300 dark:text-chief-50': pathname === link.href,
              },
            )}
          />
        );
      })}
    </>
  );
}