import { useEffect, useState } from "react";
import { useLessonsStore } from "../../store";
import type { Lesson } from "../../store/types";
import { generateTimeSlots, getNexTime } from "../../utils/schedule";
import { validateLesson } from "../../utils/lessonUtils";

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
	const modalMode = useLessonsStore((state) => state.modalMode)
	const setModalMode = useLessonsStore((state) => state.setModalMode);
	const currentCellDayOfWeek = useLessonsStore((state) => state.currentCellDayOfWeek,);
	const currentCellDate = useLessonsStore((state) => state.currentCellDate);
	const currentCellTime = useLessonsStore((state) => state.currentCellTime);
	const typeOfOpeningModal = useLessonsStore((state) => state.typeOfOpeningModal);
	const currentEditLesson = useLessonsStore((state) => state.currentEditLesson);
	const addLesson = useLessonsStore ((state) => state.addLesson);
	const editLesson = useLessonsStore((state) => state.editLesson);

	const [lessonFormValue, setLessonFormValue] = useState<Lesson>(initModalState);

	const [errorShow, setErrorShow] = useState(false);
	const [errorText, setErrorText] = useState<string | null>(null);

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

	const inputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    inputName: keyof Lesson,
  ) => {
    const inputValue =
      inputName === "dayOfWeek"
        ? Number(event.target.value)
        : event.target.value;
    setLessonFormValue({ ...lessonFormValue, [inputName]: inputValue });
  };

	const handleClickSave = () => {
			setErrorShow(false);
			setErrorText(null);
			const validation = validateLesson(lessonFormValue, lessons || [])
			if (!validation.isValid) {
				setErrorShow(true);
				setErrorText(validation.error);
	
				return;
			}

			if (modalMode === 'create') {
				addLesson(lessonFormValue);
				closeModal();
    		setModalMode("close");
				return;
			}

			if (modalMode === 'edit') {
				editLesson(lessonFormValue);
				closeModal();
    		setModalMode("close");
				return;
			}
		}

	const handleCloseModal = () => {
		closeModal();
    setModalMode("close");
	}

	return {
		lessons,
		closeModal,
		setModalMode,
		typeOfOpeningModal,
		lessonFormValue,
		timeSlots,
		inputChange,
		handleCloseModal,
		handleClickSave,
		errorShow,
		errorText
	}
}