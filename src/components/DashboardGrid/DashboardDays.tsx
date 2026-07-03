import styles from "./DashboardDays.module.css";
import { IconClock } from "../assets/icons";
import type { WeekDay } from "../../store/types";
import clsx from "clsx";

type Props = {
  days: WeekDay[];
  currentDayDate: string | null;
};

export const DashboardDays = ({ days, currentDayDate }: Props) => {
  return (
    <div className={styles.gridHeader}>
      <div className={styles.dayBlock}>
        <IconClock />
      </div>
      {days.map((day) => {
        const isCurrent = day.dateObject === currentDayDate;

        const dayBlock = clsx(styles.dayBlock, {[styles.currentDay]: isCurrent});

        return (
          <div
            className={dayBlock}
            key={day.displayDate}
            data-date={day.dateObject}
          >
            {day.fullName} {day.displayDate}
          </div>
        );
      })}
    </div>
  );
};
