import { useLessonsStore } from "../../store";
import { findLessonForCell } from "../../utils/lessonUtils";
import styles from "./DashboardGrid.module.css";
import { LessonCard } from "./LessonCard";

type Props = {
  dayIndex: number;
  timeSlot: string;
  date: string;
};

export const DashboardCell = ({ dayIndex, timeSlot, date }: Props) => {
  const lessons = useLessonsStore((state) => state.lessons);
	const openModal = useLessonsStore((state) => state.openModal);
	const setModalMode = useLessonsStore((state) => state.setModalMode);
	const setCurrentCellTimeData = useLessonsStore((state) => state.setCurrentCellTimeData)

  if (!lessons)
    return (
      <div
        className={styles.cell}
        data-day={dayIndex}
        data-time={timeSlot}
      ></div>
  );

	const handleClickCell = (dayOfWeek: number, date: string, time: string) => {
		openModal('cellClick');
		setModalMode('create');
		setCurrentCellTimeData(dayOfWeek, date, time)
	}

  const cellData = findLessonForCell(lessons, dayIndex, timeSlot, date);

  return (
    <div
      className={styles.cell}
      data-day={dayIndex}
      data-time={timeSlot}
      data-date={date}
			onClick={() => handleClickCell(dayIndex, date, timeSlot)}
    >
      {cellData && (
        <LessonCard
          lesson={cellData.lesson}
          isCancelled={cellData.isCancelled}
        />
      )}
    </div>
  );
};
