import { BrowserRouter, Route, Routes } from "react-router"
import { MainPage } from "./pages/MainPage/MainPage"
import { DashboardPage } from "./pages/DashboardPage/DashboardPage"
import { Header } from "./components/Header/Header"
import { useLessonsStore } from "./store"
import { LessonForm } from "./components/LessonForm/LessonForm"

export const App = () => {
	const modalShow = useLessonsStore((state) => state.modalShow);
	return (
		<>
			<BrowserRouter basename="/">
				<div className="wrapper">
					<Header/>
					<Routes>
						<Route path="/" element={<MainPage/>}/>
						<Route path="/dashboard" element={<DashboardPage/>}/>
					</Routes>
					{modalShow && <LessonForm/>}
				</div>
			</BrowserRouter>
		</>
	)
}
