import { useMemo } from "react";
import { useWeekStore } from "../../store";
import { IconLeftArrow, IconRightArrow } from "../assets/icons";
import styles from "./DashboardHeader.module.css";

export const DashboardHeader = () => {
  const { nextWeek, prevWeek, currentWeekOffset, getWeekRangeDates } =
    useWeekStore();
  const weekRange = useMemo(
    () => getWeekRangeDates(),
    [currentWeekOffset, getWeekRangeDates],
  );

  return (
    <div className={styles.header}>
      <div className={styles.weekNav}>
        <div className={styles.navButton} onClick={() => prevWeek()}>
          <IconLeftArrow />
        </div>
        <div className={styles.date}>
          {weekRange.startDate} - {weekRange.endDate}
        </div>
        <div className={styles.navButton} onClick={() => nextWeek()}>
          <IconRightArrow />
        </div>
      </div>
    </div>
  );
};
