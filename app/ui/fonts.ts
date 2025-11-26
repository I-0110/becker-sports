import { Inter, Tourney, Merriweather } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const tourney = Tourney({
    weight: ['400'],
    subsets: ['latin'],
});

export const merriweather = Merriweather({
    weight: ['400', '700'],
    subsets: ['latin'],
});