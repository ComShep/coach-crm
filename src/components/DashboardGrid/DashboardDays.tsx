import styles from './DashboardDays.module.css'
import { IconClock } from '../assets/icons'
import type { WeekDay } from '../../store/types'

type Props = {
	days: WeekDay[]
}

export const DashboardDays = ({days}: Props) => {
	return (
		<div className={styles.header}>
			<div className={styles.headerBlock}><IconClock/></div>
			{days.map(day => {
				return <div className={styles.headerBlock} key={day.displayDate}>{day.fullName} {day.displayDate}</div>
			})}
		</div>
	)
}
