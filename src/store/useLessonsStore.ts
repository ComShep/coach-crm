import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { LessonsStore } from "./types";



export const useLessonsStore = create<LessonsStore>() (
  devtools((set) => ({
    lessons: null,
  }), 
  { name: "LessonStore" }
));