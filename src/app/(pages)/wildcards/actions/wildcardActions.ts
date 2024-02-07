'use server';

import { db } from '@/db';
import { wildcard } from '@/db/schema/wildcard';
import { currentUser } from '@clerk/nextjs';
import { eq, sql } from 'drizzle-orm';

export async function lockInWildCard({
  _wildcard,
}: {
  _wildcard: {
    name: string;
    picked: string;
  };
}) {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found');
  }
  console.log('wildcard', _wildcard);
  db.insert(wildcard)
    .values({
      userClerkId: user.id,
      username: user.username!,
      name: _wildcard.name,
      picked: _wildcard.picked,
    })
    .onDuplicateKeyUpdate({
      set: {
        id: sql`id`,
        picked: _wildcard.picked,
        updatedAt: new Date(),
      },
    })
    .then((res) => {
      console.log('res', res);
    });
}

export async function getWildCards() {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found');
  }
  const wildCards = await db
    .select()
    .from(wildcard)
    .where(eq(wildcard.userClerkId, user.id));
  return wildCards;
}

export async function fulfillWildCard({
  wildcardName,
  wildCardCorrect,
}: {
  wildcardName: string;
  wildCardCorrect: string;
}) {
  const wildcards = await db
    .select()
    .from(wildcard)
    .where(eq(wildcard.name, wildcardName));

  wildcards.forEach(async (_wildcard) => {
    await db
      .update(wildcard)
      .set({
        correct: wildCardCorrect,
        state: wildCardCorrect === _wildcard.picked ? 'correct' : 'incorrect',
      })
      .where(eq(wildcard.id, _wildcard.id));
  });
}
