import { create } from "zustand";

interface WeekState {
	currentWeekOffset: number;
	nextWeek: () => void,
}

export const useWeekStore = create<WeekState>((set, get) => ({
	currentWeekOffset: 0,

	nextWeek: () => set((state) => ({
		currentWeekOffset: state.currentWeekOffset + 1
	})),

	prevWeek: () => set((state) => ({
		currentWeekOffset: state.currentWeekOffset - 1
	})),

	getWeekDates: () => {
		const today = new Date();

		return today;
	}
}))