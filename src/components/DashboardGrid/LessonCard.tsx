import clsx from "clsx"
import type { Lesson } from "../../store/types"
import { getDurationSlots } from "../../utils/schedule"
import { TimeLabel } from "../assets/TimeLabel/TimeLabel"
import styles from './LessonCard.module.css'

type Props = {
	lesson: Lesson,
	isCancelled: boolean,
	onOpenMenu: (event: React.MouseEvent, lesson: Lesson) => void
}

export const LessonCard = ({lesson, isCancelled, onOpenMenu}: Props) => {
	const durationSlot = getDurationSlots(lesson.startTime, lesson.endTime);

	const lessonStyle = clsx({
		[styles.lesson]: true,
		[styles.recurringColor]: lesson.type === 'recurring',
		[styles.singleColor]: lesson.type === 'single',
		[styles.cancelled]: isCancelled
	})

	const textStyles = clsx({
		[styles.text]: true,
		[styles.cancelledText]: isCancelled
	})

	const handleClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		onOpenMenu(event, lesson)
	}

	return (
		<div className={lessonStyle} style={{ height: `calc(35px * ${durationSlot})`}} onClick={(event) => handleClick(event)}>
			<div className={styles.lessonLabels}>
				<TimeLabel time={lesson.startTime} type={lesson.type}/>
				<TimeLabel time={lesson.endTime} type={lesson.type}/>
			</div>
			<p className={textStyles}><strong>Ученик:</strong> {lesson.studentName}</p>
			<p className={textStyles}><strong>Предмет:</strong> {lesson.subject}</p>
		</div>
	)
}
