import React, { useMemo } from "react";
import clsx from "clsx";
import styles from "./DashboardGrid.module.css";
import { generateTimeSlots } from "../../utils/schedule";
import { useWeekStore } from "../../store";
import { DashboardDays } from "./DashboardDays";

const slots = generateTimeSlots(9, 20, 30);

export const DashboardGrid = () => {
	const currentWeekOffset = useWeekStore((state) => state.currentWeekOffset);
  const getWeekDays = useWeekStore((state) => state.getWeekDays);
  const days = useMemo(() => getWeekDays(), [currentWeekOffset, getWeekDays]);

  const timeCell = clsx({
    [styles.timeLabel]: true,
    [styles.cell]: true,
  });

	return (
    <>
      <DashboardDays days={days}/>
      <div className={styles.grid}>
        {slots.map((slot) => {
          return (
            <React.Fragment key={`row-${slot}`}>
              <div className={timeCell} key={`time-${slot}`}>
                {slot}
              </div>
              {days.map((_, dayIndex) => {
                return (
                  <div
                    key={`${dayIndex}-${slot}`}
                    className={styles.cell}
                    data-day={dayIndex}
                    data-time={slot}
                  ></div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
