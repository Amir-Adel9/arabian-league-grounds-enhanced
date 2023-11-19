import Hero from '@/components/home/hero/Hero';
import Features from '@/components/home/features/Features';
import UpToDate from '@/components/home/up-to-date/UpToDate';
import UpcomingMatches from '@/components/home/upcoming-matches/UpcomingMatches';
import Talents from '@/components/home/talents/Talents';
import UpcomingMatchesData from '@/components/home/upcoming-matches/UpcomingMatchesData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ALGrounds | Home',
  description:
    'Your all-in-one League of Legends Arabian League companion. Teams, Schedule, Standings, Leaderboards, Rewards, and more!',
};

export default function Home() {
  return (
    <main className='relative flex min-h-screen flex-col items-center text-primary'>
      <section className='w-full min-h-screen relative flex flex-col justify-center items-center text-center lg:text-start mt-20 xs:mt-0'>
        <Hero />
      </section>
      <section
        id='features'
        className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex flex-col justify-center items-center pt-24'
      >
        <Features />
      </section>
      <section className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex flex-col justify-center items-center pt-24'>
        <UpToDate />
      </section>
      <section
        id='upcoming-matches'
        className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex flex-col justify-center items-center pt-24'
      >
        <UpcomingMatches>
          {/*  @ts-ignore Async Server Component */}
          <UpcomingMatchesData />
        </UpcomingMatches>
      </section>
      <section className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex flex-col justify-center items-center pt-24'>
        <Talents />
      </section>
    </main>
  );
}
