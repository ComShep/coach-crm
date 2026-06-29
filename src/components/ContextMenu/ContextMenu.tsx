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
  lesson: Lesson;
  onClose: () => void;
  date: string;
  anchorElement: HTMLElement | null;
};

export const ContextMenu = ({ menuX, menuY, lesson, onClose, date, anchorElement }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: menuX, y: menuY });

  const openModal = useLessonsStore((state) => state.openModal);
  const setModalMode = useLessonsStore((state) => state.setModalMode);
  const setCurrentEditLesson = useLessonsStore((state) => state.setCurrentEditLesson);

  // Сохраняем начальное смещение карточки относительно окна
  const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });

  // При монтировании запоминаем разницу между кликом и позицией карточки
  useEffect(() => {
    if (!anchorElement) return;

    const rect = anchorElement.getBoundingClientRect();
    // Запоминаем, насколько клик смещён относительно левого/верхнего края карточки
    setInitialOffset({
      x: menuX - rect.left,
      y: menuY - rect.top,
    });
  }, [anchorElement, menuX, menuY]);

  // Обновляем позицию при скролле
  useEffect(() => {
    if (!anchorElement) return;

    const updatePosition = () => {
      const rect = anchorElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Меню должно быть там же, где был клик относительно карточки
      let newX = rect.left + initialOffset.x;
      let newY = rect.top + initialOffset.y;

      // Если меню ещё не отрендерилось, используем приблизительные размеры
      if (menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();

        // Корректировка, если выходит за правый край
        if (newX + menuRect.width > windowWidth) {
          newX = windowWidth - menuRect.width - 10;
        }

        // Корректировка, если выходит за нижний край
        if (newY + menuRect.height > windowHeight) {
          newY = windowHeight - menuRect.height - 10;
        }
      }

      // Не даём уйти за левый край
      if (newX < 10) newX = 10;
      // Не даём уйти за верхний край
      if (newY < 10) newY = 10;

      setPosition({ x: newX, y: newY });
    };

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    // Подписываемся на все скролл-контейнеры
    const scrollContainers: HTMLElement[] = [];
    let parent = anchorElement.parentElement;
    while (parent) {
      if (parent.scrollHeight > parent.clientHeight) {
        scrollContainers.push(parent);
        parent.addEventListener("scroll", handleScroll);
      }
      parent = parent.parentElement;
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      scrollContainers.forEach((container) => {
        container.removeEventListener("scroll", handleScroll);
      });
    };
  }, [anchorElement, initialOffset]);

  // Закрытие по клику вне и Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

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