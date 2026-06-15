import { useEffect, useState } from "react";
import { useLessonsStore } from "../../store";
import styles from "./LessonForm.module.css";
import type { Lesson } from "../../store/types";
import { IconDate, IconSubject, IconTime, IconUser } from "../assets/icons";
import { generateTimeSlots, getNexTime } from "../../utils/schedule";
import { Button } from "../assets/Button/Button";

const initModalState: Lesson = {
  id: "",
  studentName: "",
  subject: "",
  dayOfWeek: 0,
  startTime: "",
  endTime: "",
  type: "recurring",
  singleDate: "",
};

const timeSlots = generateTimeSlots();

export const LessonForm = () => {
  const closeModal = useLessonsStore((state) => state.closeModal);
  const setModalMode = useLessonsStore((state) => state.setModalMode);
  const currentCellDayOfWeek = useLessonsStore(
    (state) => state.currentCellDayOfWeek,
  );
  const currentCellDate = useLessonsStore((state) => state.currentCellDate);
  const currentCellTime = useLessonsStore((state) => state.currentCellTime);
  const typeOfOpeningModal = useLessonsStore(
    (state) => state.typeOfOpeningModal,
  );

  const [lessonFormValue, setLessonFormValue] =
    useState<Lesson>(initModalState);

  useEffect(() => {
    if (typeOfOpeningModal === "cellClick") {
      setLessonFormValue((prevState) => ({
        ...prevState,
        dayOfWeek: currentCellDayOfWeek,
        startTime: currentCellTime,
        endTime: getNexTime(currentCellTime, timeSlots),
        singleDate: currentCellDate,
        type: currentCellDate ? "single" : "recurring",
      }));
    } else if (typeOfOpeningModal === "buttonClick") {
      setLessonFormValue(initModalState);
    }
  }, [typeOfOpeningModal]);

  const handleClickClose = () => {
    closeModal();
    setModalMode("close");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    inputName: keyof Lesson,
  ) => {
    const inputValue =
      inputName === "dayOfWeek"
        ? Number(event.target.value)
        : event.target.value;
    setLessonFormValue({ ...lessonFormValue, [inputName]: inputValue });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>Добавить занятие</h2>
          <select
            className={styles.select}
            value={lessonFormValue.type}
            onChange={(event) => handleChange(event, "type")}
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
              onChange={(event) => handleChange(event, "studentName")}
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
              onChange={(event) => handleChange(event, "subject")}
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
                onChange={(event) => handleChange(event, "dayOfWeek")}
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
                onChange={(event) => handleChange(event, "singleDate")}
              />
            </div>
          </div>
        )}
        <div>
          <div className={styles.timeBlock}>
            <div className={styles.formItem}>
              <h3>Начало</h3>
              <div className={styles.inputBlock}>
                <IconTime />
                <select
                  className={styles.select}
                  value={lessonFormValue.startTime}
                  onChange={(event) => handleChange(event, "startTime")}
                >
                  {timeSlots.slice(0, -1).map((timeSlot) => {
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
                  onChange={(event) => handleChange(event, "endTime")}
                >
                  {timeSlots.slice(1).map((timeSlot) => {
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
        </div>
				<div className={styles.actions}>
					<Button title="Закрыть" handleClick={handleClickClose} color={false}/>
					<Button title="Сохранить" handleClick={handleClickClose}/>
				</div>
      </div>
    </div>
  );
};
