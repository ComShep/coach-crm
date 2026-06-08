import clsx from "clsx"
import type { Lesson } from "../../store/types"
import { getDurationSlots } from "../../utils/schedule"
import { TimeLabel } from "../assets/TimeLabel/TimeLabel"
import styles from './LessonCard.module.css'

type Props = {
	lesson: Lesson,
	isCancelled: boolean
}

export const LessonCard = ({lesson, isCancelled}: Props) => {
	const durationSlot = getDurationSlots(lesson.startTime, lesson.endTime);

	const lessonStyle = clsx({
		[styles.lesson]: true,
		[styles.recurringColor]: lesson.type === 'recurring',
		[styles.singleColor]: lesson.type === 'single',
	})

	return (
		<div className={lessonStyle} style={{ height: `calc(35px * ${durationSlot})`}}>
			<div className={styles.lessonLabels}>
				<TimeLabel time={lesson.startTime} type={lesson.type}/>
				<TimeLabel time={lesson.endTime} type={lesson.type}/>
			</div>
			<p className={styles.student}>{lesson.studentName}</p>
		</div>
	)
}
