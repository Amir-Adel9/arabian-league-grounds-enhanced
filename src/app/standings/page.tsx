'use client';
import { useEffect } from 'react';

export default function StandingsPage() {
  useEffect(() => {
    const standings = fetch(
      `${
        process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
          ? 'https://arabian-league-grounds-enhanced.vercel.app/'
          : 'http://localhost:3002/'
      }api/predictions/retrieve?matchId=110853167109182166`
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);
  return (
    <main className='w-full min-h-screen relative flex flex-col justify-center items-center'>
      Standings Page
    </main>
  );
}
