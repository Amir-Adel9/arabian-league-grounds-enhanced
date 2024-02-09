import Image from 'next/image';

import { RedirectToSignIn, RedirectToSignUp, currentUser } from '@clerk/nextjs';
import { db } from '@/db';
import { prediction } from '@/db/schema/schema';
import { asc, desc, eq } from 'drizzle-orm';
import Predictions from '@/app/(pages)/predictions/_components/Predictions';
import { requestParams } from '@/utils/constants/requestParams';

export default async function PredictionsPage() {
  const loggedInUser = await currentUser();

  if (!loggedInUser) {
    return (
      <main className='w-full min-h-screen relative flex flex-col justify-center items-center'>
        <Image
          src='/images/dinger.gif'
          alt='dinger Image'
          width={260}
          height={260}
          draggable={false}
        />
        <p className='text-2xl font-bold text-accent-gold font-inter'>
          You must be signed in to view your predictions.
        </p>
        <RedirectToSignIn
          afterSignInUrl={'/predictions'}
          afterSignUpUrl={'/predictions'}
          redirectUrl={'/predictions'}
        />
      </main>
    );
  } else {
    const userPredictions = await db
      .select()
      .from(prediction)
      .where(eq(prediction.userClerkId, loggedInUser.id))
      .orderBy(asc(prediction.createdAt));
    const allEvents = await fetch(
      `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
      requestParams
    )
      .then((res) => res.json())
      .then((data) => {
        return data.data.schedule.events.filter((event: Event) => {
          return event.type === 'match';
        });
      });
    return (
      <main className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex justify-start items-center'>
        <Predictions predictions={userPredictions} events={allEvents} />
      </main>
    );
  }
}
