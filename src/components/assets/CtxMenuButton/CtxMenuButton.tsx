import clsx from 'clsx'
import styles from './CtxMenuButton.module.css'
import type { ComponentType } from 'react'

type Props = {
	title: string,
	color?: string,
	Icon: ComponentType,
	onClick: () => void,
}

export const CtxMenuButton = ({title, color = 'gray', Icon, onClick}: Props) => {

	const btnStyle = clsx({
		[styles.btn]: true,
		[styles[color]]: true
	})

	const handleClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		onClick()
	}

	return (
		<button className={btnStyle} onClick={handleClick}><Icon /> {title}</button>
	)
}
