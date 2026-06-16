// import { create } from "zustand";
// import type { ContextMenuStore } from "./types";
// import { devtools } from "zustand/middleware";

// export const useContextMenuStore = create<ContextMenuStore>()(
// 	devtools((set) => ({
// 		visible: false,
// 		x: 0,
// 		y: 0,
// 		lesson: null,
// 		date: null,
// 		anchorElement: null as HTMLElement | null,

// 		openMenu: (x, y, lesson, date, anchorElement) => set({ visible: true, x: x, y: y, lesson: lesson, date: date, anchorElement }),
// 		closeMenu: () => set({ visible: false, x: 0, y: 0, lesson: null, date: null, anchorElement: null })
// 	}),
// 	{ name: "ContextMenuStore"}
// ));