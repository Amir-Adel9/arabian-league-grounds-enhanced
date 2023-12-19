import { requestParams } from "../constants/requestParams";
import { Event, Stats, Team } from "../types/types";
import { getPostEventStats } from "./getPostEventStats";

export async function getRoster(slugs: string[]) {
  const allCompletedEvents = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    { ...requestParams, cache: "no-cache" }
  )
    .then((res) => res.json())
    .then((res) => res.data.schedule.events)
    .then((events) =>
      events.filter((event: Event) => event.state === "completed")
    );

  const latestCompletedMatchForTeams: Event[] = await Promise.all(
    slugs.map(async (slug) => {
      const completedEventsForTeam = allCompletedEvents.filter(
        (event: Event) =>
          event.match.teams[0].code === slug ||
          event.match.teams[1].code === slug
      );

      return completedEventsForTeam[completedEventsForTeam.length - 1];
    })
  );
  const teamEsportIds = await Promise.all(
    latestCompletedMatchForTeams.map(async (event) => {
      return await fetch(
        `https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=en-US&id=${event.match.id}`,
        requestParams
      )
        .then((res) => res.json())
        .then(
          (res) =>
            res.data.event.match.teams
              .filter((team: Team) => slugs.includes(team.code))
              .map((team: any) => team.id)[0]
        );
    })
  );
  const rosters = latestCompletedMatchForTeams.forEach(async (event) => {
    const x: Stats[] | "Event has not concluded yet" = await getPostEventStats({
      event,
    });

    if (x === "Event has not concluded yet") {
      return x;
    }

    // console.log(x[0]);

    const r = [
      teamEsportIds
        .map((teamEsportId) => {
          // console.log(
          //   x[x.length - 1].rosters.blueTeam.participants.filter(
          //     (participant: any) => participant.esportsTeamId === teamEsportId
          //   )
          // );

          return x[x.length - 1].rosters.blueTeam.participants.filter(
            (participant: any) => participant.esportsTeamId === teamEsportId
          );
        })
        .filter((x) => x.length > 0)[0],
      teamEsportIds
        .map((teamEsportId) => {
          return x[x.length - 1].rosters.redTeam.participants.filter(
            (participant: any) => participant.esportsTeamId === teamEsportId
          );
        })
        .filter((x) => x.length > 0)[0],
    ];

    // console.log(r);
  });
}
