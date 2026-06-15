import clsx from 'clsx'
import styles from './Button.module.css'

type Props = {
	title: string,
	handleClick: () => void
}

export const Button = ({title, handleClick}: Props) => {

	const btnStyle = clsx({
		[styles.btn]: true
	})

	return (
		<button onClick={() => handleClick()} className={btnStyle}>{title}</button>
	)
}
