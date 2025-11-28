'use client';

import {
  HomeIcon,
  AcademicCapIcon,
  TrophyIcon,
  BanknotesIcon,
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
    href: '/home', 
    icon: HomeIcon 
  },
  { 
    name: '101', 
    href: '/101', 
    icon: AcademicCapIcon 
  },
  { 
    name: 'Chiefs', 
    href: '/chiefs', 
    icon: '/nav-links/Chiefs.png',
    type: 'image' as const
  },
  { 
    name: 'Draft', 
    href: '/draft', 
    icon: '/nav-links/Draft.png',
    type: 'image' as const
  },
  { 
    name: 'Fantasy', 
    href: '/fantasy', 
    icon: BanknotesIcon 
  },
  {
    name: 'Hall of Fame',
    href: '/hof',
    icon: TrophyIcon
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
          >
            {link.type === 'image' ? (
            <div className='w-6 h-6 flex items-center justify-center flex-shrink-0'>
              <Image 
                src={link.icon as string} 
                alt="" 
                width={24} 
                height={24}
                className="w-full h-full object-contain"
              />               
            </div>
            ) : (
              (() => {
                const LinkIcon = link.icon as React.ComponentType<{ className?: string }>;
                return <LinkIcon className="w-6" />;
              })()
            )}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}