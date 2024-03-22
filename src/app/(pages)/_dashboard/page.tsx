import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs';
import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const loggedInUser = await currentUser();

  if (loggedInUser?.username !== 'legit' && loggedInUser?.username !== 'joroka')
    redirect('/');

  return (
    <main className='w-full min-h-screen flex justify-center items-center text-primary flex-wrap font-geist'>
      <Link
        href='/dashboard/games'
        className='p-4 border border-border text-muted-foreground rounded-lg bg-card duration-300 hover:bg-accent-gold group  flex flex-col items-center justify-center'
      >
        <Gamepad2
          size={64}
          className='stroke-accent-gold group-hover:stroke-black duration-300'
        />
        <h3 className='group-hover:text-black duration-300 font-bold font-rubik'>
          First Bloods & MVPs
        </h3>
      </Link>
    </main>
  );
}
