import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import { Event, GameDay } from '../constants/types';

dayjs.extend(timezone);
dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

export function getGameDays(schedule: Event[]): GameDay[] {
  return Object.values(
    schedule.reduce((acc: any, event: Event) => {
      const targetDate = dayjs.utc(event.startTime);
      const userDate = targetDate.tz(dayjs.tz.guess());

      const today = dayjs().startOf('day');
      const tomorrow = dayjs().add(1, 'day').startOf('day');
      const nextWeek = dayjs().add(1, 'week').startOf('day');

      let date;

      if (userDate.isSame(today, 'day')) {
        date = `Today, ${userDate.format('MMMM DD')}`;
      } else if (userDate.isSame(tomorrow, 'day')) {
        date = `Tomorrow, ${userDate.format('MMMM DD')}`;
      } else if (userDate.isAfter(today) && userDate.isBefore(nextWeek)) {
        date = userDate.format('dddd,  MMMM DD');
      } else {
        date = userDate.format('dddd, MMMM DD');
      }

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
