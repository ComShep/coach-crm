import { useState } from "react";
import { useLessonsStore } from "../../store";
import { findLessonForCell } from "../../utils/lessonUtils";
import styles from "./DashboardGrid.module.css";
import { LessonCard } from "./LessonCard";
import type { Lesson } from "../../store/types";
import { ContextMenu } from "../ContextMenu/ContextMenu";

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

	const [contextMenu, setContextMenu] = useState<{
		visible: boolean,
		x: number,
		y: number,
		lesson: Lesson | null,
		anchorElement: HTMLElement | null;
	}>({
		visible: false,
		x: 0,
		y: 0,
		lesson: null,
		anchorElement: null
	})

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
		setContextMenu({
			visible: true,
			x: event.clientX,
			y: event.clientY,
			lesson: lesson,
			anchorElement: anchor
		})
	}

	const handleCloseMenu = () => {
		setContextMenu({
			visible: false,
			x: 0,
			y: 0,
			lesson: null,
			anchorElement: null,
		})
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
			{contextMenu.visible && contextMenu.lesson && 
				<ContextMenu 
				menuX={contextMenu.x} 
				menuY={contextMenu.y} 
				lesson={contextMenu.lesson} 
				onClose={handleCloseMenu}
				date={date}
				anchorElement={contextMenu.anchorElement}
			/>}
    </div>
  );
};
