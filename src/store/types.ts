export interface WeekDay {
	fullName: string,
	shortName: string,
	date: string
}

interface WeekRange {
	startDate: string,
	endDate: string
}

interface WeekState {
	currentWeekOffset: number,
}

interface WeekAction {
	nextWeek: () => void,
	prevWeek: () => void,
	getWeekDates: () => Date[],
	getWeekDays: () => WeekDay[],
	getWeekRangeDates: () => WeekRange
}

export type WeekStore = WeekState & WeekAction

interface LessonsState {
	lessons: Lesson[] | null
}

interface LessonsAction {
	addLesson?: (lesson: Lesson) => void
}

interface Lesson {
	name: string
}

export type LessonsStore = LessonsState & LessonsAction;