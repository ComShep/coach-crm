import { DashboardDays } from "../../components/DashboardDays/DashboardDays"
import { DashboardGrid } from "../../components/DashboardGrid/DashboardGrid"
import { DashboardHeader } from "../../components/DashboardHeader/DashboardHeader"
import styles from './DashboardPage.module.css'

export const DashboardPage = () => {
	return (
		<div className={styles.container}>
			<DashboardHeader/>
			<DashboardDays/>
			<DashboardGrid/>
		</div>
	)
}
