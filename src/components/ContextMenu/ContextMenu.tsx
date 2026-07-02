import styles from "./ContextMenu.module.css";
import type { Lesson, ModalModeTypes, TypeOfOpeningModal } from "../../store/types";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCancel } from "react-icons/tb";
import { GrEdit } from "react-icons/gr";
import { IoReload } from "react-icons/io5";
import { CtxMenuButton } from "../assets/CtxMenuButton/CtxMenuButton";

type Props = {
  lesson: Lesson;
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  position: { x: number; y: number };
  openModal: (type: TypeOfOpeningModal) => void;
  setModalMode: (mode: ModalModeTypes) => void;
  isCancelled: boolean;
};

export const ContextMenu = ({
  lesson,
  onClose,
  menuRef,
  position,
  openModal,
  setModalMode,
  isCancelled,
}: Props) => {

  const handleEditClick = () => {
    openModal("lessonClick");
    setModalMode("edit");
    onClose();
  };

  const handleCancelClick = () => {
		setModalMode('confirmCancel')
		openModal("lessonClick")
    onClose();
  };

  const handleRestoreClick = () => {
		setModalMode('confirmRestore')
		openModal("lessonClick")
    onClose();
  };

	const handleDeleteClick = () => {
		setModalMode('confirmDel')
		openModal("lessonClick")
		onClose();
	}

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
      <CtxMenuButton
        title="Редактировать"
        Icon={GrEdit}
        onClick={handleEditClick}
      />
      {lesson.type === "recurring" && (
        <CtxMenuButton
          title={isCancelled ? "Восстановить урок" : "Отменить урок"}
          Icon={isCancelled ? IoReload : TbCancel}
          onClick={isCancelled ? handleRestoreClick : handleCancelClick}
        />
      )}
      <div className={styles.separator}></div>
      <CtxMenuButton
        title="Удалить"
        Icon={RiDeleteBinLine}
        onClick={handleDeleteClick}
        color="red"
      />
    </div>
  );
};
