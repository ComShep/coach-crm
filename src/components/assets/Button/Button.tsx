import clsx from 'clsx'
import styles from './Button.module.css'

type Props = {
	title: string,
	handleClick: () => void,
	color?: boolean
}

export const Button = ({title, handleClick, color = true}: Props) => {

	const btnStyle = clsx({
		[styles.btn]: true,
		[styles.colorBtn]: color === true,
		[styles.whiteBtn]: color === false
	})

	return (
		<button onClick={() => handleClick()} className={btnStyle}>{title}</button>
	)
}
