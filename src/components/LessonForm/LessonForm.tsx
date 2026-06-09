import { useState } from "react";
import { useLessonsStore } from "../../store";
import styles from "./LessonForm.module.css";
import type { Lesson } from "../../store/types";
import { IconDate, IconSubject, IconTime, IconUser } from "../assets/icons";
import { generateTimeSlots } from "../../utils/schedule";

const timeSlots = generateTimeSlots();

export const LessonForm = () => {
  const toggleModalShow = useLessonsStore((state) => state.toggleModalShow);
  const setModalMode = useLessonsStore((state) => state.setModalMode);

  const [lessonFormValue, setLessonFormValue] = useState<Lesson>({
    id: "",
    studentName: "",
    subject: "",
    dayOfWeek: 0,
    startTime: "",
    endTime: "",
    type: "recurring",
    singleDate: "",
  });

  const handleClickClose = () => {
    toggleModalShow();
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
            value={lessonFormValue.type}
            onChange={(event) => handleChange(event, "type")}
          >
            <option value="recurring">Периодическое</option>
            <option value="single">Разовое</option>
          </select>
        </div>
        <div className={styles.inputBlock}>
          <IconUser />
          <input
            value={lessonFormValue.studentName}
            onChange={(event) => handleChange(event, "studentName")}
          />
        </div>
        <div className={styles.inputBlock}>
          <IconSubject />
          <input
            value={lessonFormValue.subject}
            onChange={(event) => handleChange(event, "subject")}
          />
        </div>
        { lessonFormValue.type === 'recurring' && <div className={styles.inputBlock}>
          <IconDate />
          <select
            value={lessonFormValue.dayOfWeek}
            onChange={(event) => handleChange(event, "dayOfWeek")}
          >
            <option value="0">Понедельник</option>
            <option value="1">Вторник</option>
            <option value="2">Среда</option>
            <option value="3">Четверг</option>
            <option value="4">Пятница</option>
            <option value="5">Суббота</option>
            <option value="6">Воскресенье</option>
          </select>
        </div>}
        { lessonFormValue.type !== 'recurring' &&
          <div className={styles.inputBlock}>
            <IconDate />
            <input
              type="date"
              value={lessonFormValue.singleDate}
              onChange={(event) => handleChange(event, "singleDate")}
            />
          </div>
        }
        <div className={styles.inputBlock}>
          <IconTime />
          <select
            value={lessonFormValue.startTime}
            onChange={(event) => handleChange(event, "startTime")}
          >
            {timeSlots.slice(0, -1).map((timeSlot) => {
              return <option value={timeSlot}>{timeSlot}</option>;
            })}
          </select>
        </div>
        <div className={styles.inputBlock}>
          <IconTime />
          <select
            value={lessonFormValue.endTime}
            onChange={(event) => handleChange(event, "endTime")}
          >
            {timeSlots.slice(1).map((timeSlot) => {
              return <option value={timeSlot}>{timeSlot}</option>;
            })}
          </select>
        </div>
        <div onClick={() => handleClickClose()}>close</div>
      </div>
    </div>
  );
};
