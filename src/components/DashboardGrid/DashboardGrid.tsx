import clsx from "clsx";
import styles from "./DashboardGrid.module.css";
import { generateTimeSlots } from "../../utils/schedule";

export const DashboardGrid = () => {
  const slots = generateTimeSlots(9, 20, 30);
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
            <div className={timeCell}>{slot}</div>
            <div className={styles.cell}>1</div>
            <div className={styles.cell}>2</div>
            <div className={styles.cell}>3</div>
            <div className={styles.cell}>4</div>
            <div className={styles.cell}>5</div>
            <div className={styles.cell}>6</div>
            <div className={styles.cell}>7</div>
          </>
        );
      })}
    </div>
  );
};
