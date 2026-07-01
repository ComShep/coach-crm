import { useLessonsStore } from "../../store";
import { findLessonForCell } from "../../utils/lessonUtils";
import styles from "./DashboardGrid.module.css";
import { LessonCard } from "./LessonCard";
import type { Lesson } from "../../store/types";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { useContextMenu } from "../../hooks/ContextMenu/useContextMenu";

type Props = {
  dayIndex: number;
  timeSlot: string;
  date: string;
};

export const DashboardCell = ({ dayIndex, timeSlot, date }: Props) => {
	const lessons = useLessonsStore((state) => state.lessons);
	const setCurrentCellTimeData = useLessonsStore((state) => state.setCurrentCellTimeData);

	const { 		
		menuRef,
		position,
		openModal,
		setModalMode,
		setCurrentEditLesson,
		setCurentLessonDate,
		openMenu,
		closeMenu,
		contextMenu,
		cancelLesson,
		restoreLesson,
		deleteLesson
	} = useContextMenu();

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

	const handleOpenMenu = (event: React.MouseEvent, lesson: Lesson) => {
		event.stopPropagation();
		const anchor = event.currentTarget as HTMLElement;
		openMenu(event.clientX, event.clientY, lesson, anchor);
		setCurrentEditLesson(lesson);
		setCurentLessonDate(date);
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
					onOpenMenu={handleOpenMenu}
        />
      )}
			{cellData && contextMenu.visible && contextMenu.lesson && 
				<ContextMenu 
				lesson={contextMenu.lesson}
				menuRef={menuRef}     
        position={position}
				openModal={openModal} 
				onClose={closeMenu}
				setModalMode={setModalMode}
				cancelLesson={cancelLesson}
				restoreLesson={restoreLesson}
				deleteLesson={deleteLesson}
				isCancelled={cellData.isCancelled}
			/>}
    </div>
  );
};
