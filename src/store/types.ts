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

export interface Lesson {
	id: string,
	studentName: string,
	subject: string,
	dayOfWeek: number,
	startTime: string,
	endTime: string,
	type: 'recurring' | 'single',
	singleDate?: string,
	cancelledInstances?: string[]
}

export type LessonsStore = LessonsState & LessonsAction;