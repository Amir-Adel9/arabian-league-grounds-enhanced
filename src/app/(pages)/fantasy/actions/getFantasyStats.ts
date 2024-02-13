'use server';

import {
  calculateFantasyPoints,
  getFantasyTeamStats,
  lockInFantasyTeam,
} from '@/entities/fantasy/fantasy.actions';

import { FantasyRoster } from '@/entities/fantasy/fantasy.types';
import { revalidatePath } from 'next/cache';

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

  revalidatePath('/', 'layout');
  revalidatePath('/fantasy');
  revalidatePath('/(pages)/fantasy', 'page');
  revalidatePath('/(pages)/fantasy/edit', 'page');
}
