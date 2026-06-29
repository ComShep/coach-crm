import styles from "./ContextMenu.module.css";
import type { Lesson } from "../../store/types";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCancel } from "react-icons/tb";
import { GrEdit } from "react-icons/gr";
import { CtxMenuButton } from "../assets/CtxMenuButton/CtxMenuButton";
import { useContextMenu } from "../../hooks/ContextMenu/useContextMenu";

type Props = {
  menuX: number;       
  menuY: number;        
  lesson: Lesson;
  onClose: () => void;
  date: string;
  anchorElement: HTMLElement | null;
};

export const ContextMenu = ({ menuX, menuY, lesson, onClose, date, anchorElement }: Props) => {
  const {menuRef, openModal, setModalMode, setCurrentEditLesson, position} = useContextMenu({menuX, menuY, anchorElement, onClose})

  const handleEditClick = () => {
    openModal("lessonClick");
    setModalMode("edit");
    onClose();
    setCurrentEditLesson(lesson);
  };

  return (
    <div
      ref={menuRef}
      className={styles.ctxMenu}
      style={{
        left: position.x,
        top: position.y,
        position: "fixed",
        zIndex: 9999,
      }}
    >
      <div className={styles.header}>
        {lesson.studentName} · {lesson.startTime}
      </div>
      <div className={styles.separator}></div>
      <CtxMenuButton title="Редактировать" Icon={GrEdit} onClick={handleEditClick} />
      {lesson.type === "recurring" && (
        <CtxMenuButton
          title="Отменить урок"
          Icon={TbCancel}
          onClick={() => console.log(date)}
        />
      )}
      <div className={styles.separator}></div>
      <CtxMenuButton
        title="Удалить"
        Icon={RiDeleteBinLine}
        onClick={() => console.log(123)}
        color="red"
      />
    </div>
  );
};