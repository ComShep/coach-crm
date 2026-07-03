import React, { useMemo } from "react";
import clsx from "clsx";
import styles from "./DashboardGrid.module.css";
import { generateTimeSlots } from "../../utils/schedule";
import { useWeekStore } from "../../store";
import { DashboardDays } from "./DashboardDays";
import { DashboardCell } from "./DashboardCell";
import { DashboardDaysMobile } from "./DashboardDaysMobile";

const timeSlots = generateTimeSlots();

export const DashboardGrid = () => {
	const currentWeekOffset = useWeekStore((state) => state.currentWeekOffset);
	const currentDayDate = useWeekStore((state) => state.currentDate)
  const getWeekDays = useWeekStore((state) => state.getWeekDays);
  const days = useMemo(() => getWeekDays(), [currentWeekOffset, getWeekDays]);

  const timeCell = clsx({
    [styles.timeLabel]: true,
    [styles.cell]: true,
  });

	return (
    <>
      <DashboardDays days={days} currentDayDate={currentDayDate}/>
			<DashboardDaysMobile days={days} currentDayDate={currentDayDate}/>
      <div className={styles.grid}>
        {timeSlots.map((timeSlot) => {
          return (
            <React.Fragment key={`row-${timeSlot}`}>
              <div className={timeCell} key={`time-${timeSlot}`}>
                {timeSlot}
              </div>
              {days.map((days, dayIndex) => {
                return (
									<DashboardCell 
										key={`${dayIndex}-${timeSlot}`}
										dayIndex={dayIndex}
										timeSlot={timeSlot}
										date={days.dateObject}
									/>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
