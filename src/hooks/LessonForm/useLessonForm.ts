import { useEffect, useState } from "react";
import { useLessonsStore } from "../../store";
import type { Lesson } from "../../store/types";
import { generateTimeSlots, getNexTime } from "../../utils/schedule";

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

export const useLessonForm = () => {
	const lessons = useLessonsStore((state) => state.lessons);
	const closeModal = useLessonsStore((state) => state.closeModal);
	const setModalMode = useLessonsStore((state) => state.setModalMode);
	const currentCellDayOfWeek = useLessonsStore((state) => state.currentCellDayOfWeek,);
	const currentCellDate = useLessonsStore((state) => state.currentCellDate);
	const currentCellTime = useLessonsStore((state) => state.currentCellTime);
	const typeOfOpeningModal = useLessonsStore((state) => state.typeOfOpeningModal);
	const currentEditLesson = useLessonsStore((state) => state.currentEditLesson);

	const [lessonFormValue, setLessonFormValue] = useState<Lesson>(initModalState);

	const timeSlots = generateTimeSlots();

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
		} else if (typeOfOpeningModal === 'lessonClick' && currentEditLesson !== null) {
			setLessonFormValue(currentEditLesson)
		}
	}, [typeOfOpeningModal]);

	return {
		lessons,
		closeModal,
		setModalMode,
		typeOfOpeningModal,
		lessonFormValue,
		setLessonFormValue,
		timeSlots
	}
}