export interface WeekDay {
	fullName: string,
	shortName: string,
	date: string
}

export interface WeekState {
	currentWeekOffset: number;
	nextWeek: () => void,
	prevWeek: () => void,
	getWeekDates: () => Date[],
	getWeekDays: () => WeekDay[]
}
