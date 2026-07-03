import clsx from "clsx";
import type { WeekDay } from "../../store/types";
import styles from "./DashboardDays.module.css";
import { useWeekStore } from "../../store";

type Props = {
  days: WeekDay[];
  currentDayDate: string;
};

export const DashboardDaysMobile = ({ days, currentDayDate }: Props) => {
	const activeDate = useWeekStore((state) => state.activeDate);
	const setActiveDate = useWeekStore((state) => state.setActiveDate);

  return (
    <div className={styles.gridHeaderMobile}>
      {days.map((day) => {
				const isCurrent = day.dateObject === currentDayDate;
				const isActive = day.dateObject === activeDate

				const mobileDayBlock = clsx(
					styles.mobileDayBlock, {
						[styles.currentDay]: isCurrent, 
						[styles.activeDay]: isActive
					});

        return (
          <div className={mobileDayBlock} key={day.dateObject} onClick={() => setActiveDate(day.dateObject)}>
            <span className={styles.mobileDayName}>{day.shortName}</span>
            <span className={styles.mobileDayDate}>{day.displayDate}</span>
          </div>
        );
      })}
    </div>
  );
};
