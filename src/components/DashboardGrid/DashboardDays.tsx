import styles from './DashboardDays.module.css'
import { IconClock } from '../assets/icons'

export const DashboardDays = () => {
	const days = [
		{
			name: 'Понедельник',
			date: '01.06'
		},
		{
			name: 'Вторник',
			date: '02.06'
		},
		{
			name: 'Среда',
			date: '03.06'
		},
		{
			name: 'Четверг',
			date: '04.06'
		},
		{
			name: 'Пятница',
			date: '05.06'
		},
		{
			name: 'Суббота',
			date: '06.06'
		},
		{
			name: 'Воскресенье',
			date: '07.06'
		},
	]
	return (
		<div className={styles.header}>
			<div className={styles.headerBlock}><IconClock/></div>
			{days.map(day => {
				return <div className={styles.headerBlock} key={day.date}>{day.name} {day.date}</div>
			})}
		</div>
	)
}
