import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Lesson, LessonsStore, TypeOfOpeningModal } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const demoLessons: Lesson[] = [
  {
    id: "1",
    studentName: "Анна Смирнова",
    subject: "Английский язык",
    dayOfWeek: 0, 
    startTime: "10:00",
    endTime: "11:30",
    type: "recurring",
    cancelledInstances: [],
  },
  {
    id: "2",
    studentName: "Матвей Кузнецов",
    subject: "Математика",
    dayOfWeek: 1, 
    startTime: "14:00",
    endTime: "15:30",
    type: "recurring",
    cancelledInstances: [],
  },
  {
    id: "3",
    studentName: "София Морозова",
    subject: "Физика",
    dayOfWeek: 2, 
    startTime: "11:30",
    endTime: "12:30",
    type: "recurring",
    cancelledInstances: [],
  },
  {
    id: "4",
    studentName: "Игорь Дмитриев",
    subject: "Программирование",
    dayOfWeek: 3, 
    startTime: "16:00",
    endTime: "18:00",
    type: "recurring",
    cancelledInstances: [],
  },
  {
    id: "5",
    studentName: "Екатерина Волкова",
    subject: "Химия",
    dayOfWeek: 6, 
    startTime: "09:00",
    endTime: "10:30",
    type: "recurring",
    cancelledInstances: ["2026-06-14"], // пример отменённого занятия
  },
  {
    id: "7",
    studentName: "Ольга Новикова",
    subject: "Биология",
    dayOfWeek: 1,
    startTime: "15:00",
    endTime: "16:30",
    type: "single",
    singleDate: "2026-06-16",
  },
	{
    id: "8",
    studentName: "Ольга Новикова",
    subject: "Биология",
    dayOfWeek: 2,
    startTime: "15:00",
    endTime: "16:30",
    type: "single",
    singleDate: "2026-06-17",
  },
];

export const useLessonsStore = create<LessonsStore>()(
  devtools((set, get) => ({
    lessons: demoLessons,
		modalShow: false,
		modalMode: 'close',
		currentCellDayOfWeek: 0,
		currentCellDate: '',
		currentCellTime: '',
		typeOfOpeningModal: 'buttonClick',
		currentEditLesson: null,

		toggleModalShow: () => set((state) => ({modalShow: !state.modalShow})),
		openModal: (typeOfOpening: TypeOfOpeningModal) => set({typeOfOpeningModal: typeOfOpening, modalShow: true}),
		closeModal: () => set({modalShow: false}),
		setModalMode: (mode) => set({modalMode: mode}),
		setCurrentCellTimeData: (dayOfWeek: number, date: string, time: string) =>  set({currentCellDayOfWeek: dayOfWeek, currentCellDate: date, currentCellTime: time}),
		setCurrentEditLesson: (lesson: Lesson) => set({currentEditLesson: lesson}),
		addLesson: (newLessonData) =>  {
			const { lessons } = get();
			const newLesson = { ...newLessonData, id: uuidv4()}
  		set({ lessons: lessons ? [...lessons, newLesson] : [newLesson] });
		},
		editLesson: (editLessonData) =>  {
			const { lessons, currentEditLesson } = get();
			if (!lessons || !currentEditLesson) return;

			const changedLessons = lessons.map(lesson => lesson.id === currentEditLesson.id ? {...editLessonData, id: lesson.id} : lesson)
  		set({ lessons: changedLessons });
		}
  }), 
  { name: "LessonStore" }
));