export interface WeekDay {
	fullName: string,
	shortName: string,
	displayDate: string,
	dateObject: string
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

interface LessonsState {
	lessons: Lesson[] | null,
	modalShow: boolean,
	modalMode: ModalModeTypes
}

type ModalModeTypes = 'create' | 'edit' | 'close'

interface LessonsAction {
	toggleModalShow: () => void,
	setModalMode: (mode: ModalModeTypes) => void
	// addLesson?: (lesson: Lesson) => void
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

export type WeekStore = WeekState & WeekAction
export type LessonsStore = LessonsState & LessonsAction;
