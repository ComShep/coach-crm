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
	const modalMode = useLessonsStore((state) => state.modalMode);
	const toggleModalShow = useLessonsStore((state) => state.toggleModalShow);
	const setModalMode = useLessonsStore((state) => state.setModalMode);

  if (!lessons)
    return (
      <div
        className={styles.cell}
        data-day={dayIndex}
        data-time={timeSlot}
      ></div>
  );

	const handleClickCell = () => {
		toggleModalShow();
		setModalMode('create')
		console.log(modalMode)
	}

  const cellData = findLessonForCell(lessons, dayIndex, timeSlot, date);

  return (
    <div
      className={styles.cell}
      data-day={dayIndex}
      data-time={timeSlot}
      data-date={date}
			onClick={() => handleClickCell()}
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
