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

	return (
		<div className={styles.lesson} style={{ height: `calc(35px * ${durationSlot})`}}>
			<div className={styles.lessonLabels}>
				<TimeLabel time={lesson.startTime}/>
				<TimeLabel time={lesson.endTime}/>
			</div>
			{lesson.studentName}
		</div>
	)
}
