export const formatDate = (date: Date): string => {
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	return `${day}.${month}`
}

export const weekDayName = (date: Date, format: 'full' | 'short'): string => {
	const fullNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
	const shortNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

	const dayIndex = (date.getDay() + 6) % 7
	
	return format === 'full' ? fullNames[dayIndex] : shortNames[dayIndex]
}