import { BrowserRouter, Route, Routes } from "react-router"
import { MainPage } from "./pages/MainPage/MainPage"
import { DashboardPage } from "./pages/DashboardPage/DashboardPage"
import { Header } from "./components/Header/Header"
import { useLessonsStore } from "./store"
import { LessonForm } from "./components/ModalWindows/LessonForm"
import { ConfrimDialog } from "./components/ModalWindows/ConfrimDialog"

export const App = () => {
	const modalShow = useLessonsStore((state) => state.modalShow);
	const modalMode = useLessonsStore((state) => state.modalMode);
	return (
		<>
			<BrowserRouter basename="/">
				<div className="wrapper">
					<Header/>
					<Routes>
						<Route path="/" element={<MainPage/>}/>
						<Route path="/dashboard" element={<DashboardPage/>}/>
					</Routes>
					{modalShow && (modalMode === 'edit' || modalMode === 'create') && <div className="modal-layot"><LessonForm/></div>}
					{modalShow && (modalMode === 'confirmCancel' || modalMode === 'confirmRestore' || modalMode === 'confirmDel') && <div className="modal-layot"><ConfrimDialog /></div>}
				</div>
			</BrowserRouter>
		</>
	)
}
