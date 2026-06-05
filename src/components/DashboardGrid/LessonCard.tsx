import type { Lesson } from "../../store/types"

type Props = {
	lesson: Lesson,
	isCancelled: boolean
}

export const LessonCard = ({lesson, isCancelled}: Props) => {
	console.log(lesson)
	return (
		<div>LessonCard</div>
	)
}
