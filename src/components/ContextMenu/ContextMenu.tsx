import { useEffect, useRef } from "react";
import styles from "./ContextMenu.module.css";
import type { Lesson } from "../../store/types";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCancel } from "react-icons/tb";
import { GrEdit } from "react-icons/gr";
import { CtxMenuButton } from "../assets/CtxMenuButton/CtxMenuButton";

type Props = {
  menuX: number;
  menuY: number;
	lesson: Lesson
  onClose: () => void;
	date: string
};

export const ContextMenu = ({ menuX, menuY, lesson, onClose, date }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

	const handleClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		console.log(lesson)
	}

  return (
    <div
      className={styles.ctxMenu}
      style={{ left: menuX, top: menuY }}
      ref={menuRef}
			onClick={handleClick}
    >
      <div className={styles.header}>
				{lesson.studentName} · {lesson.startTime}
			</div>
			<div className={styles.separator}></div>
			<CtxMenuButton title="Редактировать" Icon={GrEdit} onClick={() => console.log(123)}/>
			{lesson.type === 'recurring' && <CtxMenuButton title="Отменить урок" Icon={TbCancel} onClick={() => console.log(date)}/>}
			<div className={styles.separator}></div>
			<CtxMenuButton title="Удалить" Icon={RiDeleteBinLine} onClick={() => console.log(123)} color="red"/>
    </div>
  );
};
