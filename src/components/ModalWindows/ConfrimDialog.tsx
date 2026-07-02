import { useLessonsStore } from '../../store';
import { Button } from '../assets/Button/Button';
import styles from './LessonForm.module.css'

export const ConfrimDialog = () => {
	const lesson = useLessonsStore((state) => state.currentEditLesson);
	const currentLessonDate = useLessonsStore((state) => state.currentLessonDate);
	const modalMode = useLessonsStore((state) => state.modalMode);
	const closeModal = useLessonsStore((state) => state.closeModal);
	const setModalMode = useLessonsStore((state) => state.setModalMode);
	const deleteLesson = useLessonsStore((state) => state.deleteLesson);
	const cancelLesson = useLessonsStore((state) => state.cancelLesson);
	const restoreLesson = useLessonsStore((state) => state.restoreLesson);

	const handleConfirmClick = () => {
		if (modalMode === 'confirmDel') {
			deleteLesson();
		} else if (modalMode === 'confirmCancel') {
			cancelLesson();
		} else if (modalMode === 'confirmRestore') {
			restoreLesson();
		}

		closeModal();
    setModalMode("close");
	}

	const handleCloseClick = () => {
		closeModal();
    setModalMode("close");
	}

	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalHeader}>
				{modalMode === 'confirmDel' && <h2>Удалить занятие?</h2>}
				{modalMode === 'confirmCancel' && <h2>Отменить занятие?</h2>}
				{modalMode === 'confirmRestore' && <h2>Восстановить занятие?</h2>}
			</div>
			{modalMode === 'confirmDel' && <p>{`Вы действительно хотите удалить урок ${lesson?.studentName} ${currentLessonDate} в ${lesson?.startTime}?`}</p>}
			{modalMode === 'confirmCancel' && <p>{`Вы действительно хотите отменить урок ${lesson?.studentName} ${currentLessonDate} в ${lesson?.startTime}?`}</p>}
			{modalMode === 'confirmRestore' && <p>{`Вы действительно хотите восстановить урок ${lesson?.studentName} ${currentLessonDate} в ${lesson?.startTime}?`}</p>}
			<div className={styles.actions}>
				<Button handleClick={handleCloseClick} title='Отмена' color={false}/>
				<Button handleClick={handleConfirmClick} title='Подтвердить' color={true}/>
			</div>
		</div>
	)
}
