import clsx from 'clsx'
import styles from './TimeLabel.module.css'

type Props = {
	time: string
	type: string
}

export const TimeLabel = ({time, type}: Props) => {

	const labelStyles = clsx({
		[styles.label]: true,
		[styles.recurringColor]: type === 'recurring',
		[styles.singleColor]: type === 'single',
	})

	return (
		<div className={labelStyles}>{time}</div>
	)
}
