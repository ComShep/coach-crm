import { useLessonsStore } from '../../store';
import styles from './LessonForm.module.css'


export const LessonForm = () => {
	const toggleModalShow = useLessonsStore((state) => state.toggleModalShow);
	const setModalMode = useLessonsStore((state) => state.setModalMode);

	const handleClickClose = () => {
		toggleModalShow();
		setModalMode('close')
	}

	return (
		<div className={styles.modal}>LessonForm
			<div onClick={() => handleClickClose()}>close</div>
		</div>
	)
}
