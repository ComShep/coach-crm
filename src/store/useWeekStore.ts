import { create } from "zustand";
import { formatDate, weekDayName } from "../utils/formatingDate";
import type { WeekDay, WeekStore } from "./types";
import { devtools } from "zustand/middleware";

export const useWeekStore = create<WeekStore>()(
  devtools(
    (set, get) => ({
      currentWeekOffset: 0,

      nextWeek: () => set(
        (state) => ({
          currentWeekOffset: state.currentWeekOffset + 1
        }),
        false,
        "week/nextWeek"
      ),

      prevWeek: () => set(
        (state) => ({
          currentWeekOffset: state.currentWeekOffset - 1
        }),
        false,
        "week/prevWeek"
      ),

      getWeekDates: () => {
        const { currentWeekOffset } = get();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentDay = today.getDay();
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

        const monday = new Date();
        monday.setDate(today.getDate() + mondayOffset + currentWeekOffset * 7);
        
        const weekDates: Date[] = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(monday);
          date.setDate(monday.getDate() + i);
          weekDates.push(date);
        }

        return weekDates;
      },

      getWeekDays: () => {
        const weekDates = get().getWeekDates();

        const weekDays: WeekDay[] = weekDates.map((date) => ({
          fullName: weekDayName(date, 'full'),
          shortName: weekDayName(date, 'short'),
          date: formatDate(date)
        }));

        return weekDays;
      },

      getWeekRangeDates: () => {
        const weekDates = get().getWeekDates();

        return {
          startDate: formatDate(weekDates[0]),
          endDate: formatDate(weekDates[6])
        };
      }
    }),
    { name: "WeekStore" }
  )
);