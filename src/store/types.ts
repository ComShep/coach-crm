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
	modalMode: ModalModeTypes,
	currentCellDayOfWeek: number,
	currentCellDate: string,
	currentCellTime: string,
	currentLessonDate: string,
	typeOfOpeningModal: TypeOfOpeningModal,
	currentEditLesson: Lesson | null
}

export type ModalModeTypes = 'create' | 'edit' | 'confirmDel' | 'confirmCancel' | 'confirmRestore' | 'close';
export type TypeOfOpeningModal = 'buttonClick' | 'cellClick' | 'lessonClick'

interface LessonsAction {
	loadLessons: () => void,
	saveLessons: () => void,
	openModal: (typeOfOpening: TypeOfOpeningModal) => void,
	closeModal: () => void,
	setModalMode: (mode: ModalModeTypes) => void,
	setCurrentCellTimeData: (dayOfWeek: number, date: string, time: string) => void,
	setCurentLessonDate: (date: string) => void,
	setCurrentEditLesson: (lesson: Lesson) => void,
	addLesson: (newLessonData: Lesson) => void,
	editLesson: (editLessonData: Lesson) => void,
	cancelLesson: () => void,
	restoreLesson: () => void,
	deleteLesson: () => void
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
