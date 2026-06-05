import styles from './TimeLabel.module.css'

type Props = {
	time: string
}

export const TimeLabel = ({time}: Props) => {
	return (
		<div className={styles.label}>{time}</div>
	)
}
