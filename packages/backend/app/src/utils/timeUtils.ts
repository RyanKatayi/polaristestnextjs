// src/timeUtility.ts

import { parseISO, isFriday, isSaturday, getDay, isAfter, setHours, setMinutes, setSeconds } from 'date-fns';

interface TimeFrame {
  isWeekday: boolean;
  isWeekdayNight: boolean;
  isWeekend: boolean;
}

export function determineTimeFrame(orderDate: string): TimeFrame {
  const date = parseISO(orderDate);
  const weekdayNightStart = setSeconds(setMinutes(setHours(date, 20), 0), 0); // 8 PM

  const isWeekday = !isFriday(date) && !isSaturday(date) && getDay(date) !== 0;
  const isWeekdayNight = isWeekday && isAfter(date, weekdayNightStart);
  const isWeekend = isFriday(date) || isSaturday(date);

  return {
    isWeekday,
    isWeekdayNight,
    isWeekend,
  };
}
