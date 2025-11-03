import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AudioPlayer } from '@/components/audio-player';
import { Alegreya } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Pernikahan Lidia & Abil',
  description: 'Dengan memohon Rahmat dan Ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami.',
};

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alegreya.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <AudioPlayer />
      </body>
    </html>
  );
}
