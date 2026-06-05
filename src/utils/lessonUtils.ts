import type { Lesson } from "../store/types";

export const findLessonForCell = (
	lessons: Lesson[], 
	dayIndex: number, 
	timeSlot: string, 
	date: string
	) => {
  const lesson = lessons?.find((lesson) => {
    if (lesson.dayOfWeek !== dayIndex) return false;
    if (lesson.startTime !== timeSlot) return false;

    if (lesson.type === "single") {
      return lesson.singleDate === date;
    }

    return true;
  })

	if(!lesson) return null

	return {
		lesson,
		isCancelled: lesson.type === 'recurring' && lesson.cancelledInstances?.includes(date) === true
	}
};

