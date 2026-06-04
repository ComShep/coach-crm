import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Lesson, LessonsStore } from "./types";

export const demoLessons: Lesson[] = [
  {
    id: "1",
    studentName: "Анна Смирнова",
    subject: "Английский язык",
    dayOfWeek: 0, // понедельник
    startTime: "10:00",
    endTime: "11:30",
    type: "recurring",
    cancelledInstances: [],
  },
  {
    id: "2",
    studentName: "Матвей Кузнецов",
    subject: "Математика",
    dayOfWeek: 1, // вторник
    startTime: "14:00",
    endTime: "15:30",
    type: "recurring",
    cancelledInstances: [],
  },
  {
    id: "3",
    studentName: "София Морозова",
    subject: "Физика",
    dayOfWeek: 2, // среда
    startTime: "11:00",
    endTime: "12:30",
    type: "recurring",
    cancelledInstances: [],
  },
  {
    id: "4",
    studentName: "Игорь Дмитриев",
    subject: "Программирование",
    dayOfWeek: 3, // четверг
    startTime: "16:00",
    endTime: "18:00",
    type: "recurring",
    cancelledInstances: [],
  },
  {
    id: "5",
    studentName: "Екатерина Волкова",
    subject: "Химия",
    dayOfWeek: 4, // пятница
    startTime: "09:00",
    endTime: "10:30",
    type: "recurring",
    cancelledInstances: ["2024-06-14"], // пример отменённого занятия
  },
  {
    id: "7",
    studentName: "Ольга Новикова",
    subject: "Биология",
    dayOfWeek: 6,
    startTime: "15:00",
    endTime: "16:30",
    type: "single",
    singleDate: "2024-06-16",
  },
];

export const useLessonsStore = create<LessonsStore>()(
  devtools((set) => ({
    lessons: demoLessons,
  }), 
  { name: "LessonStore" }
));