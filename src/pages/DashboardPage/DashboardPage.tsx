import { DashboardGrid } from "../../components/DashboardGrid"
import { DashboardHeader } from "../../components/DashboardHeader/DashboardHeader"
import styles from './DashboardPage.module.css'

export const DashboardPage = () => {
	return (
		<div className={styles.container}>
			<DashboardHeader/>
			<DashboardGrid/>
		</div>
	)
}
