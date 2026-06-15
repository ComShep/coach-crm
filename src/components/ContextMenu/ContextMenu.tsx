import { useEffect, useRef } from "react";
import styles from "./ContextMenu.module.css";
import type { Lesson } from "../../store/types";

type Props = {
  menuX: number;
  menuY: number;
	lesson: Lesson
  onClose: () => void;
};

export const ContextMenu = ({ menuX, menuY, lesson, onClose }: Props) => {
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
      test
    </div>
  );
};
