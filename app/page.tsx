import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { merriweather } from './ui/fonts';
import Image from 'next/image';
import NavBar from './ui/nav';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <NavBar />
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-chief-50 px-6 py-10 md:w-2/5 md:px-20">
        <div className={styles.shape} />
          <p className={`${merriweather.className}text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <Link href="https://nextjs.org/learn/" className="text-chief-400">
              Next.js Learn Course
            </Link>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-chief-300 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-chief-100 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex justify-center max-w-6xl mx-auto px-4">
          {/* Desktop Video - 16:9 aspect ratio */}
          <div className="hidden md:block w-full aspect-video">
              <iframe 
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/mt5eWqVj-gc?autoplay=1&mute=1&controls=1" 
              title="Burnt Ends vs Cuban Sandwich"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen 
              />
          </div>
          
          {/* Mobile Video - 16:9 aspect ratio */}
          <div className="block md:hidden w-full aspect-video">
              <iframe 
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/CtNAzlU7h4Q?autoplay=1&mute=1&controls=1" 
              title="Pittsburgh Smoked Ham vs Miami-Cuban Sandwich" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen 
              />
          </div>
        </div>
      </div>
    </main>
  );
}
