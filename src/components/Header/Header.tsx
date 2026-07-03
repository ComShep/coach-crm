import { NavLink } from "react-router"
import styles from './Header.module.css'


export const Header = () => {
	return (
		<header className={styles.header}>
			<div>LOGO</div>
			<nav className={styles.navigation}>
				<NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/'>Главная</NavLink>
				<NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/dashboard'>Расписание</NavLink>
			</nav>
		</header>
	)
}
