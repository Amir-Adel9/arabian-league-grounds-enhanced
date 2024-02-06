'use server';

import {
  calculateFantasyPoints,
  getFantasyTeamStats,
  lockInFantasyTeam,
} from '@/entities/fantasy/fantasy.actions';

import { FantasyRoster } from '@/entities/fantasy/fantasy.types';

export default async function handleFantasy({
  fantasyRoster,
}: {
  fantasyRoster: FantasyRoster;
}) {
  await lockInFantasyTeam({
    fantasyRoster,
  }).catch((error) => {
    return error;
  });

  // const fantasyPoints = await getFantasyTeamStats();
  const fantasyPoints = await calculateFantasyPoints();

  return fantasyPoints;
}
