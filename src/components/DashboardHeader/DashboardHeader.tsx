import { useMemo } from "react";
import { useLessonsStore, useWeekStore } from "../../store";
import { IconLeftArrow, IconRightArrow } from "../assets/icons";
import styles from "./DashboardHeader.module.css";
import { Button } from "../assets/Button/Button";

export const DashboardHeader = () => {
  const { nextWeek, prevWeek, currentWeekOffset, getWeekRangeDates } =
    useWeekStore();
  const weekRange = useMemo(
    () => getWeekRangeDates(),
    [currentWeekOffset, getWeekRangeDates],
  );

	const openModal = useLessonsStore((state) => state.openModal);
	const setModalMode = useLessonsStore((state) => state.setModalMode);

	const handleClickBtn = () => {
		openModal('buttonClick');
		setModalMode('create');
	}

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
			<Button title="Добавить новое занятие" handleClick={handleClickBtn}/>
    </div>
  );
};
