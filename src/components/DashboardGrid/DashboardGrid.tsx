import clsx from "clsx";
import styles from "./DashboardGrid.module.css";
import { generateTimeSlots } from "../../utils/schedule";

const slots = generateTimeSlots(9, 20, 30);

const days = [
  {
    name: "Понедельник",
    date: "01.06",
  },
  {
    name: "Вторник",
    date: "02.06",
  },
  {
    name: "Среда",
    date: "03.06",
  },
  {
    name: "Четверг",
    date: "04.06",
  },
  {
    name: "Пятница",
    date: "05.06",
  },
  {
    name: "Суббота",
    date: "06.06",
  },
  {
    name: "Воскресенье",
    date: "07.06",
  },
];

export const DashboardGrid = () => {
  const timeCell = clsx({
    [styles.timeLabel]: true,
    [styles.cell]: true,
  });

  console.log(slots);

  return (
    <div className={styles.grid}>
      {slots.map((slot) => {
        return (
          <>
            <div className={timeCell} key={`time-${slot}`}>{slot}</div>
						{days.map((day, dayIndex) => {
							return (
								<div
									key={`${day.date}-${slot}`}
									className={styles.cell}
									data-day={dayIndex}
									data-time={slot}
								>	
								</div>
							)
						})}
          </>
        );
      })}
    </div>
  );
};
