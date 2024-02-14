import { db } from '@/db';
import {
  fantasyHistory,
  fantasyTeam,
  player,
  playerToFantasyTeam,
  user,
} from '@/db/schema/schema';
import { currentUser } from '@clerk/nextjs';
import { and, eq, sql } from 'drizzle-orm';
import { FantasyPlayer, FantasyRoster } from './fantasy.types';
import { revalidatePath } from 'next/cache';

export async function createFantasyTeam() {
  const user = await currentUser();

  if (!user) throw new Error('No user found');

  const existingFantasyTeam = await db
    .select()
    .from(fantasyTeam)
    .where(eq(fantasyTeam.userClerkId, user.id))
    .then((res) => res[0]);

  if (!existingFantasyTeam) {
    await db
      .insert(fantasyTeam)
      .values({
        userClerkId: user.id,
        username: user.username!,
      })
      .onDuplicateKeyUpdate({
        set: {
          id: sql`id`,
        },
      });
    return;
  }
}

export async function getFantasyTeamId({ userId }: { userId: string }) {
  if (!userId) throw new Error('No user found');

  const fantasyTeamForUser = await db
    .select()
    .from(fantasyTeam)
    .where(eq(fantasyTeam.userClerkId, userId))
    .then((res) => {
      return res[0]?.id;
    });

  return fantasyTeamForUser;
}

export async function getAllUserIds() {
  const userIds = await db
    .select()
    .from(user)
    .innerJoin(fantasyTeam, eq(user.clerkId, fantasyTeam.userClerkId))
    .then((res) => {
      return res.map((res) => res.user.clerkId);
    });

  return userIds;
}

export async function getFantasyRoster({
  fantasyTeamId,
}: {
  fantasyTeamId: number;
}) {
  const fantasyPlayerIds = await db
    .select({
      playerId: playerToFantasyTeam.playerId,
    })
    .from(playerToFantasyTeam)
    .where(eq(playerToFantasyTeam.fantasyTeamId, fantasyTeamId))
    .then((res) => res.map((player) => player.playerId));

  const fantasyPlayers = await Promise.all(
    fantasyPlayerIds.map(async (id) => {
      return await db
        .select()
        .from(player)
        .where(eq(player.id, id))
        .then((res) => res[0]);
    })
  );
  const fantasyRoster = {
    top: fantasyPlayers.find((player) => player.role === 'top'),
    jungle: fantasyPlayers.find((player) => player.role === 'jungle'),
    mid: fantasyPlayers.find((player) => player.role === 'mid'),
    bot: fantasyPlayers.find((player) => player.role === 'bot'),
    support: fantasyPlayers.find((player) => player.role === 'support'),
  } as FantasyRoster;

  return fantasyRoster;
}

export async function getFantasyPlayers({
  fantasyTeamId,
}: {
  fantasyTeamId: number;
}) {
  const fantasyPlayers = await db
    .select()
    .from(playerToFantasyTeam)
    .where(eq(playerToFantasyTeam.fantasyTeamId, fantasyTeamId));

  return fantasyPlayers;
}

export async function getPlayer({ playerId }: { playerId: number }) {
  const _player = await db
    .select()
    .from(player)
    .where(eq(player.id, playerId))
    .then((res) => res[0]);

  return _player;
}

export async function addPlayerToFantasyTeam({
  fantasyPlayer,
  fantasyTeamId,
  userClerkId,
}: {
  fantasyPlayer: FantasyPlayer;
  fantasyTeamId: number;
  userClerkId: string;
}) {
  if (!fantasyTeamId) throw new Error('No fantasyTeamId found');

  const playerToAdd = await db
    .select()
    .from(player)
    .where(eq(player.summonerName, fantasyPlayer.summonerName))
    .then((res) => res[0]);

  const playerAlreadyInRoleId = await db
    .select()
    .from(playerToFantasyTeam)
    .where(
      and(
        eq(playerToFantasyTeam.fantasyTeamId, fantasyTeamId),
        eq(playerToFantasyTeam.role, fantasyPlayer.role)
      )
    )
    .then((res) => res[0]);

  const playerAlreadyInRole = await db
    .select()
    .from(player)
    .where(eq(player.id, playerAlreadyInRoleId?.playerId))
    .then((res) => res[0]);

  if (!playerToAdd) throw new Error('Player not found');

  await db
    .insert(playerToFantasyTeam)
    .values({
      fantasyTeamId: fantasyTeamId,
      playerSummonerName: playerToAdd.summonerName,
      playerId: playerToAdd.id,
      role: playerToAdd.role,
    })
    .onDuplicateKeyUpdate({
      set: {
        fantasyTeamId: fantasyTeamId,
        playerId: playerToAdd.id,
        playerSummonerName: playerToAdd.summonerName,
        role: playerToAdd.role,
        points: 0,
        pickedAt: new Date(),
      },
    });

  db.transaction(async (tx) => {
    const [_user] = await tx
      .select({
        credits: user.credits,
        predictionPoints: user.predictionPoints,
        fantasyPoints: user.fantasyPoints,
      })
      .from(user)
      .where(eq(user.clerkId, userClerkId));
    console.log(playerToAdd.cost, playerAlreadyInRole.cost, _user.credits);
    if (playerAlreadyInRoleId) {
      await db.insert(fantasyHistory).values({
        fantasyTeamId: fantasyTeamId,
        playerId: playerAlreadyInRoleId.playerId,
        playerSummonerName: playerAlreadyInRoleId.playerSummonerName,
        role: playerAlreadyInRoleId.role,
        points: playerAlreadyInRoleId.points,
        pickedAt: playerAlreadyInRoleId.pickedAt,
        droppedAt: new Date(),
      });

      await db
        .update(user)
        .set({
          credits:
            playerToAdd.cost > playerAlreadyInRole.cost
              ? sql`${_user.credits} - ${Math.abs(
                  playerToAdd.cost - playerAlreadyInRole.cost
                )}`
              : sql`${_user.credits} + ${Math.abs(
                  playerToAdd.cost - playerAlreadyInRole.cost
                )}`,
        })
        .where(eq(user.clerkId, userClerkId));
    } else {
      await db
        .update(user)
        .set({
          credits: sql`${_user.credits} - ${playerToAdd.cost}`,
        })
        .where(eq(user.clerkId, userClerkId));
    }
  });

  revalidatePath('/', 'layout');
  revalidatePath('/fantasy');
  revalidatePath('/(pages)/fantasy', 'page');
  revalidatePath('/(pages)/fantasy/edit', 'page');
}

export async function changeToCaptain({
  fantasyPlayer,
  fantasyTeamId,
}: {
  fantasyPlayer: FantasyPlayer;
  fantasyTeamId: number;
}) {
  await db
    .update(playerToFantasyTeam)
    .set({
      isCaptain: false,
    })
    .where(eq(playerToFantasyTeam.fantasyTeamId, fantasyTeamId));

  await db
    .update(playerToFantasyTeam)
    .set({
      isCaptain: true,
    })
    .where(
      and(
        eq(playerToFantasyTeam.fantasyTeamId, fantasyTeamId),
        eq(playerToFantasyTeam.playerId, fantasyPlayer.id)
      )
    );
  revalidatePath('/', 'layout');
  revalidatePath('/fantasy');
  revalidatePath('/(pages)/fantasy', 'page');
  revalidatePath('/(pages)/fantasy/edit', 'page');
}

export async function getTeamCaptain({
  fantasyTeamId,
}: {
  fantasyTeamId: number;
}) {
  const captainId = await db
    .select()
    .from(playerToFantasyTeam)
    .where(eq(playerToFantasyTeam.fantasyTeamId, fantasyTeamId))
    .then(
      (res) => res.find((player) => player.isCaptain)?.playerId || undefined
    );

  if (!captainId) return undefined;
  const captain = await db
    .select()
    .from(player)
    .where(eq(player.id, captainId))
    .then((res) => res[0]);

  revalidatePath('/', 'layout');
  revalidatePath('/fantasy');
  revalidatePath('/(pages)/fantasy', 'page');
  revalidatePath('/(pages)/fantasy/edit', 'page');

  return captain;
}

export async function updateFantasyPointsForPlayer({
  playerId,
  points,
  fantasyTeamId,
}: {
  playerId: number;
  points: number;
  fantasyTeamId: number;
}) {
  await db
    .update(playerToFantasyTeam)
    .set({
      points: points,
    })
    .where(
      and(
        eq(playerToFantasyTeam.playerId, playerId),
        eq(playerToFantasyTeam.fantasyTeamId, fantasyTeamId)
      )
    );
}

export async function updateFantasyPointsForUser({
  fantasyTeamId,
  points,
}: {
  fantasyTeamId: number;
  points: number;
}) {
  const userId = await db
    .select({
      userId: fantasyTeam.userClerkId,
    })
    .from(fantasyTeam)
    .where(eq(fantasyTeam.id, fantasyTeamId))
    .then((res) => res[0].userId);

  await db
    .update(user)
    .set({
      fantasyPoints: points,
    })
    .where(eq(user.clerkId, userId));
}

export async function updateCreditsForUser({
  userClerkId,
  fantasyPoints,
}: {
  userClerkId: string;
  fantasyPoints: number;
}) {
  db.transaction(async (tx) => {
    // console.log('updating creds for user:', userClerkId);
    const [_user] = await tx
      .select({
        credits: user.credits,
        predictionPoints: user.predictionPoints,
        fantasyPoints: user.fantasyPoints,
      })
      .from(user)
      .where(eq(user.clerkId, userClerkId));
    console.log(
      'abeeta',
      _user.credits,
      (_user.predictionPoints / 100) * 10 +
        Math.ceil((fantasyPoints * 0.5) / 5) * 5,
      ` ${
        _user.credits -
        ((_user.predictionPoints / 100) * 10 +
          Math.ceil((fantasyPoints * 0.5) / 5) * 5)
      }`
    );
    await db
      .update(user)
      .set({
        credits: sql`${_user.credits} + ${
          _user.credits -
          ((_user.predictionPoints / 100) * 10 +
            Math.ceil((fantasyPoints * 0.5) / 5) * 5)
        }`,
      })
      .where(eq(user.clerkId, userClerkId));
  });
}

// export async function updateCreditsForUsers() {
//   db.transaction(async (tx) => {
//     const users = await tx.select().from(user);

//     users.forEach(async (_user) => {
//       const { clerkId: userClerkId, fantasyPoints } = _user;
//       console.log('updating creds for user:', _user.username);
//       const tId = await getFantasyTeamId({ userId: userClerkId });
//       const cost = await getFantasyRoster({
//         fantasyTeamId: tId,
//       }).then((res) => {
//         return Object.values(res).reduce((acc, curr) => {
//           return acc + curr?.cost;
//         }, 0);
//       });

//       console.log(cost);

//       console.log(
//         'abeeta',
//         _user.credits,
//         (_user.predictionPoints / 100) * 10 +
//           Math.ceil((fantasyPoints * 0.5) / 5) * 5,
//         ` ${
//           _user.credits -
//           ((_user.predictionPoints / 100) * 10 +
//             Math.ceil((fantasyPoints * 0.5) / 5) * 5)
//         }`
//       );
//       await db
//         .update(user)
//         .set({
//           credits: sql`${700 - cost < 0 ? 0 : 700 - cost} + ${Math.abs(
//             (_user.predictionPoints / 100) * 10 +
//               Math.ceil((fantasyPoints * 0.5) / 5) * 5
//           )}`,
//         })
//         .where(eq(user.clerkId, userClerkId));
//     });
//   });
// }

export async function getFantasyHistoryPlayers({
  fantasyTeamId,
}: {
  fantasyTeamId: number;
}) {
  const fantasyHistoryPlayers = await db
    .select()
    .from(fantasyHistory)
    .where(eq(fantasyHistory.fantasyTeamId, fantasyTeamId));

  return fantasyHistoryPlayers;
}
