import { requestParams } from '@/utils/constants/requestParams';
import { NextResponse } from 'next/server';

export async function GET() {
  const fullSchedule = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    requestParams
  )
    .then((res) => res.json())
    .then((matches) => {
      return matches.data.schedule.events
        .filter((event: any) => {
          const matchState = event.state;

          return matchState === 'unstarted' || matchState === 'inProgress';
        })
        .slice(0, 8);
    });
  console.log(fullSchedule);

  return NextResponse.json(fullSchedule);
}
