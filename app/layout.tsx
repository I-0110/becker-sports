import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Becker Sports',
    default: 'Becker Sports',
  },
  description: "By Alex Becker",
  icons: {
    icon: 'sports.png',
  },
  metadataBase: new URL('https://www.beckersports.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased dark:bg-chief-400`}>{children}</body>
    </html>
  );
}
