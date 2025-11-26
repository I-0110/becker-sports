'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, HomeIcon, AcademicCapIcon, BanknotesIcon, TrophyIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import SportsLogo from './sports-logo';

export default function NavBar() {
    const [open, setOpen] = useState(false);

    const links = [
        { 
            name: 'Home', 
            href: '/', 
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
        {
            name: 'Sunday Night Foodball',
            href: '/snf',
            icon: '/nav-links/steak.svg',
            type: 'image' as const
        },
    ];

    return (
    <nav className="sticky top-0 z-50 bg-chief-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile hamburger - left side */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-chief-50"
            aria-label="Toggle menu"
          >
            {open ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>

          {/* Logo - centered on mobile, left on desktop */}
          <SportsLogo />

          {/* Desktop Navigation - center */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex space-x-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 py-2 text-white hover:bg-chief-400/50 hover:text-chief-100 rounded-md font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-chief-50 hover:text-chief-100" aria-label="Search">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
            <button className="p-2 text-chief-50 hover:text-chief-100">
                <UserCircleIcon className='w-6 h-6' />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-50'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-chief-200 border-t border-chief-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-3 text-chief-400 hover:bg-chief-400/50 hover:text-chief-100 rounded-md font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
)};