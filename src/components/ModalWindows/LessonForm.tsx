import styles from "./LessonForm.module.css";
import { IconDate, IconSubject, IconTime, IconUser } from "../assets/icons";
import { Button } from "../assets/Button/Button";
import { useLessonForm } from "../../hooks/LessonForm/useLessonForm";
import { ErrorMessage } from "./ErrorMessage";

export const LessonForm = () => {
	const { 
		typeOfOpeningModal,
		lessonFormValue,
		timeSlots,
		inputChange,
		handleCloseModal,
		handleClickSave,
		errorShow,
		errorText
	} = useLessonForm();

  return (
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
					{typeOfOpeningModal === 'lessonClick' ? <h2>Редактировать занятие</h2> : <h2>Добавить занятие</h2>}
          <select
            className={styles.select}
            value={lessonFormValue.type}
            onChange={(event) => inputChange(event, "type")}
          >
            <option value="recurring">Периодическое</option>
            <option value="single">Разовое</option>
          </select>
        </div>
        <div className={styles.formItem}>
          <h3>Имя ученика</h3>
          <div className={styles.inputBlock}>
            <IconUser />
            <input
              className={styles.formInput}
              value={lessonFormValue.studentName}
              onChange={(event) => inputChange(event, "studentName")}
              placeholder="Например: Иван Иванов"
            />
          </div>
        </div>
        <div className={styles.formItem}>
          <h3>Предмет</h3>
          <div className={styles.inputBlock}>
            <IconSubject />
            <input
              className={styles.formInput}
              value={lessonFormValue.subject}
              onChange={(event) => inputChange(event, "subject")}
              placeholder="Например: Математика"
            />
          </div>
        </div>
        {lessonFormValue.type === "recurring" && (
          <div className={styles.formItem}>
            <h3>Выберите день недели</h3>
            <div className={styles.inputBlock}>
              <IconDate />
              <select
                value={lessonFormValue.dayOfWeek}
                onChange={(event) => inputChange(event, "dayOfWeek")}
                className={styles.select}
              >
                <option value="0">Понедельник</option>
                <option value="1">Вторник</option>
                <option value="2">Среда</option>
                <option value="3">Четверг</option>
                <option value="4">Пятница</option>
                <option value="5">Суббота</option>
                <option value="6">Воскресенье</option>
              </select>
            </div>
          </div>
        )}
        {lessonFormValue.type !== "recurring" && (
          <div className={styles.formItem}>
            <h3>Выберите дату</h3>
            <div className={styles.inputBlock}>
              <IconDate />
              <input
                className={styles.select}
                type="date"
                value={lessonFormValue.singleDate}
                onChange={(event) => inputChange(event, "singleDate")}
              />
            </div>
          </div>
        )}
				<div className={styles.timeBlock}>
					<div className={styles.formItem}>
						<h3>Начало</h3>
						<div className={styles.inputBlock}>
							<IconTime />
							<select
								className={styles.select}
								value={lessonFormValue.startTime}
								onChange={(event) => inputChange(event, "startTime")}
							>
								{timeSlots.slice(0, -2).map((timeSlot) => {
									return (
										<option key={`start-${timeSlot}`} value={timeSlot}>
											{timeSlot}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className={styles.formItem}>
						<h3>Конец</h3>
						<div className={styles.inputBlock}>
							<IconTime />
							<select
								className={styles.select}
								value={lessonFormValue.endTime}
								onChange={(event) => inputChange(event, "endTime")}
							>
								{timeSlots.slice(2).map((timeSlot) => {
									return (
										<option key={`end-${timeSlot}`} value={timeSlot}>
											{timeSlot}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				</div>
				{errorShow && <ErrorMessage errorText={errorText}/>}
				<div className={styles.actions}>
					<Button title="Закрыть" handleClick={handleCloseModal} color={false}/>
					<Button title="Сохранить" handleClick={handleClickSave}/>
				</div>
      </div>
  );
};
