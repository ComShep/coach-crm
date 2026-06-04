export interface WeekDay {
	fullName: string,
	shortName: string,
	date: string
}

interface WeekRange {
	startDate: string,
	endDate: string
}

export interface WeekState {
	currentWeekOffset: number,
	nextWeek: () => void,
	prevWeek: () => void,
	getWeekDates: () => Date[],
	getWeekDays: () => WeekDay[],
	getWeekRangeDates: () => WeekRange
}
