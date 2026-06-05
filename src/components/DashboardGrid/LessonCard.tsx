import type { Lesson } from "../../store/types"
import { TimeLabel } from "../assets/TimeLabel/TimeLabel"
import styles from './LessonCard.module.css'

type Props = {
	lesson: Lesson,
	isCancelled: boolean
}

export const LessonCard = ({lesson, isCancelled}: Props) => {
	console.log(lesson)
	return (
		<div className={styles.lesson}>
			<div className={styles.lessonLabels}>
				<TimeLabel time={lesson.startTime}/>
				<TimeLabel time={lesson.endTime}/>
			</div>
			{lesson.studentName}
		</div>
	)
}
