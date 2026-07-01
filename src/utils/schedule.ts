const START_HOUR = 8;
const END_HOUR = 22;
const STEP_MINUTES = 30;

export const generateTimeSlots = (startHour: number = START_HOUR, endHour: number = END_HOUR, stepMinutes: number = STEP_MINUTES): string[] => {
	const slots: string[] = [];
	for (let hour = startHour; hour <= endHour; hour ++) {
		for (let minute = 0; minute < 60; minute += stepMinutes) {
			if (hour === endHour && minute > 0) break;
			const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
			slots.push(time)
		}
	}

	return slots;
}

export const getSlotNumber = (time: string, startHour: number = START_HOUR): number => {
	const [hour, minutes] = time.split(':').map(Number);

	return (hour - startHour) * 2 + (minutes === 30 ? 1 : 0)
}

export const getDurationSlots = (startTime: string, endTime: string): number => {
	const startSlot = getSlotNumber(startTime);
	const endSlot = getSlotNumber(endTime);

	return endSlot - startSlot
}

export const getNextTime = (time: string, timeSlots: string[]) => {
	const index = timeSlots.indexOf(time);
	return timeSlots[index + 2] || time;
}