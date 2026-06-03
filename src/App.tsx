import { BrowserRouter, Route, Routes } from "react-router"
import { MainPage } from "./pages/MainPage/MainPage"
import { DashboardPage } from "./pages/DashboardPage/DashboardPage"
import { Header } from "./components/Header/Header"

export const App = () => {
	
	return (
		<>
			<BrowserRouter basename="/">
				<div className="wrapper">
					<Header/>
					<Routes>
						<Route path="/" element={<MainPage/>}/>
						<Route path="/dashboard" element={<DashboardPage/>}/>
					</Routes>
				</div>
			</BrowserRouter>
		</>
	)
}
