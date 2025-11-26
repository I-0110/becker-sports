import { tourney } from '@/app/ui/fonts';
import Image from 'next/image';

export default function SportsLogo() {
  return (
    <div className={`${tourney.className} flex flex-row items-center leading-none text-white`}>
      <Image
        className="h-12 w-12 brightness-0 invert dark:opacity-90"
        src="/sports.png"
        alt="Blog Logo"
        width={100}
        height={20}
        priority
      />
      <p className="text-[30px]">Becker Sports</p>
    </div>
  );
}
