import dayjs, { Dayjs } from 'dayjs';

export function getFormattedDate(date: Dayjs) {
  const today = dayjs().startOf('day');
  const tomorrow = dayjs().add(1, 'day').startOf('day');
  const nextWeek = dayjs().add(1, 'week').startOf('day');

  let formattedDate;

  if (date.isSame(today, 'day')) {
    formattedDate = `Today, ${date.format('MMMM DD')}`;
  } else if (date.isSame(tomorrow, 'day')) {
    formattedDate = `Tomorrow, ${date.format('MMMM DD')}`;
  } else if (date.isAfter(today) && date.isBefore(nextWeek)) {
    formattedDate = date.format('dddd,  MMMM DD');
  } else {
    formattedDate = date.format('dddd, MMMM DD');
  }

  return formattedDate;
}
