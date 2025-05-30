import '../globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import {
  Inter,
  Rubik,
  Gluten,
  Permanent_Marker,
  Kanit,
} from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import Footer from '@/components/layout/Footer';
import { fulfillUpdates } from '@/entities/actions';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});
const gluten = Gluten({
  subsets: ['vietnamese', 'latin-ext', 'latin'],
  variable: '--font-gluten',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});
const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  variable: '--font-permanent-marker',
  weight: ['400'],
});
const kanit = Kanit({
  subsets: ['latin'],
  variable: '--font-kanit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'AL Grounds',
  description:
    'Your all-in-one League of Legends Arabian League companion. Teams, Schedule, Standings, Leaderboards, Rewards, and more!',
};

export default async function RootLayout({
  children,
  matchModal,
}: {
  children: React.ReactNode;
  matchModal: React.ReactNode;
}) {
  await fulfillUpdates();
  return (
    <ClerkProvider>
      <html lang='en' className='bg-background'>
        <head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href='https://fonts.googleapis.com/css2?family=Gluten:wght@100;200;300;400;500;600;700;800;900&display=swap'
            rel='stylesheet'
          />
        </head>
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${rubik.variable} ${gluten.variable} ${permanentMarker.variable} ${kanit.variable}`}
        >
          {/*  @ts-ignore Async Server Component */}
          <Header />
          <Navbar />
          {children}
          {matchModal}
          <Toaster richColors position='top-center' expand />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
