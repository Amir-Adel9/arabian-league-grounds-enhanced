import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import { Event, GameDay } from '../types/types';
import { getFormattedDate } from './getFormattedDate';

dayjs.extend(timezone);
dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

export function getGameDays(schedule: Event[]): GameDay[] {
  return Object.values(
    schedule.reduce((acc: any, event: Event) => {
      const relativeEventTime = dayjs.utc(event.startTime).tz(dayjs.tz.guess());

      const date = getFormattedDate(relativeEventTime);

      if (!acc[date]) {
        acc[date] = {
          date,
          events: [],
        };
      }
      acc[date].events.push(event);
      return acc;
    }, {})
  );
}
