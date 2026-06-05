import styles from './DashboardGrid.module.css'

type Props = {
	dayIndex: number,
	timeSlot: string,
	date: string
}

export const DashboardCell = ({dayIndex, timeSlot, date}: Props) => {
  return (
    <div
      className={styles.cell}
      data-day={dayIndex}
      data-time={timeSlot}
    ></div>
  );
};
