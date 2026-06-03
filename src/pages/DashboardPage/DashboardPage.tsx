import { DashboardDays } from "../../components/DashboardDays/DashboardDays"
import { DashboardHeader } from "../../components/DashboardHeader/DashboardHeader"
import styles from './DashboardPage.module.css'

export const DashboardPage = () => {
	return (
		<div className={styles.container}>
			<DashboardHeader/>
			<DashboardDays/>
		</div>
	)
}
