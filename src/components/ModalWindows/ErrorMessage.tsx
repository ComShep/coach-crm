import styles from './LessonForm.module.css'

type Props = {
	errorText: string | null
}

export const ErrorMessage = ({errorText}: Props) => {
	return (
		<div className={styles.error}>
			⚠️ {errorText}
		</div>
	)
}
