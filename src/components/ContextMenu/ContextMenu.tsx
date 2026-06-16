import { useEffect, useRef, useState } from "react";
import styles from "./ContextMenu.module.css";
import type { Lesson } from "../../store/types";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCancel } from "react-icons/tb";
import { GrEdit } from "react-icons/gr";
import { CtxMenuButton } from "../assets/CtxMenuButton/CtxMenuButton";
import { useLessonsStore } from "../../store";

type Props = {
  menuX: number;
  menuY: number;
	lesson: Lesson
  onClose: () => void;
	date: string
};

export const ContextMenu = ({ menuX, menuY, lesson, onClose, date }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: menuX, y: menuY });

	const openModal = useLessonsStore((state) => state.openModal);
	const setModalMode = useLessonsStore((state) => state.setModalMode);
	const setCurrentEditLesson = useLessonsStore((state) => state.setCurrentEditLesson)

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

	useEffect(() => {
		if(menuRef.current) {
			const rect = menuRef.current.getBoundingClientRect();
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			const scrollX = window.scrollX;
			const scrollY = window.scrollY;

			const menuClientX = menuX - scrollX;
      const menuClientY = menuY - scrollY;

      let newX = menuX;
      let newY = menuY;

			if (menuClientX + rect.width > windowWidth) {
        newX = scrollX + windowWidth - rect.width - 10;
      }

      // Если меню выходит за нижний край окна
      if (menuClientY + rect.height > windowHeight) {
        newY = scrollY + windowHeight - rect.height - 10;
      }

      // Если меню выходит за левый край
      if (newX < scrollX + 10) newX = scrollX + 10;

      // Если меню выходит за верхний край
      if (newY < scrollY + 10) newY = scrollY + 10;

			setPosition({ x: newX, y: newY });
		}
	}, [menuX, menuY])

	const handleEditClick = () => {
		openModal('lessonClick');
		setModalMode('edit');
		onClose();
		setCurrentEditLesson(lesson);
		console.log(lesson)
	}

  return (
    <div
      className={styles.ctxMenu}
      style={{ left: position.x, top: position.y }}
      ref={menuRef}
    >
      <div className={styles.header}>
				{lesson.studentName} · {lesson.startTime}
			</div>
			<div className={styles.separator}></div>
			<CtxMenuButton title="Редактировать" Icon={GrEdit} onClick={handleEditClick}/>
			{lesson.type === 'recurring' && <CtxMenuButton title="Отменить урок" Icon={TbCancel} onClick={() => console.log(date)}/>}
			<div className={styles.separator}></div>
			<CtxMenuButton title="Удалить" Icon={RiDeleteBinLine} onClick={() => console.log(123)} color="red"/>
    </div>
  );
};
