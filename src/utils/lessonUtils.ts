import type { Lesson } from "../store/types";
import { getSlotNumber } from "./schedule";

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

const checkConflict = (newLessonStartSlot: number, newLessonEndSlot: number, newLesson: Lesson, allLessons: Lesson[]): Lesson | null => {
	return allLessons.find(lesson => {
		if (lesson.id === newLesson.id) return false;

		if (newLesson.dayOfWeek !== lesson.dayOfWeek) return false;

		const lessonStartSlot = getSlotNumber(lesson.startTime);
		const lessonEndSlot = getSlotNumber(lesson.endTime);

		return newLessonStartSlot < lessonEndSlot && newLessonEndSlot > lessonStartSlot
		
	}) || null;
}

export const validateLesson = (
	lesson: Lesson,
	allLessons: Lesson []
): {isValid: boolean, error: string | null} => {

	if (!lesson.studentName || lesson.studentName.trim() === '') {
		return {
			isValid: false,
			error: 'Введите имя ученика'
		};
	}

	if (!lesson.subject || lesson.subject.trim() === '') {
		return {
			isValid: false,
			error: 'Введите название предмета'
		};
	}

	const numOfStartSlot = getSlotNumber(lesson.startTime);
	const numOfEndSlot = getSlotNumber(lesson.endTime);

	if(numOfEndSlot <= numOfStartSlot) {
		return {
			isValid: false,
			error: 'Время начала должно быть раньше времени окончания'
		}
	}

	if(numOfEndSlot - numOfStartSlot < 2) {
		return {
			isValid: false,
			error: 'Продолжительность занятия должна быть минимум 1 час'
		}
	}

	const conflict = checkConflict(numOfStartSlot, numOfEndSlot, lesson, allLessons)

	if (conflict) {
		return {
			isValid: false,
			error: `Конфликт с занятием: ${conflict.studentName} (${conflict.startTime}-${conflict.endTime})`
		}
	}

	return {
		isValid: true,
		error: null
	}
}

