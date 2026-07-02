import { useEffect, useRef, useState } from "react";
import { useLessonsStore } from "../../store";
import type { Lesson } from "../../store/types";


export const useContextMenu = () => {
	const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0});
	const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });

	const openModal = useLessonsStore((state) => state.openModal);
	const setModalMode = useLessonsStore((state) => state.setModalMode);
	const setCurrentEditLesson = useLessonsStore((state) => state.setCurrentEditLesson);
	const setCurentLessonDate = useLessonsStore((state) => state.setCurentLessonDate);

	const [contextMenu, setContextMenu] = useState<{
		visible: boolean,
		x: number,
		y: number,
		lesson: Lesson | null,
		anchorElement: HTMLElement | null;
	}>({
		visible: false,
		x: 0,
		y: 0,
		lesson: null,
		anchorElement: null
	})

	const openMenu = (x: number, y: number, lesson: Lesson, anchorElement: HTMLElement) => {
		setContextMenu({
			visible: true,
			x,
			y,
			lesson,
			anchorElement
		})
	}

	const closeMenu = () => {
		setContextMenu({
			visible: false,
			x: 0,
			y: 0,
			lesson: null,
			anchorElement: null,
		})
	}

	// При монтировании запоминаем разницу между кликом и позицией карточки
	useEffect(() => {
    if (!contextMenu.visible || !contextMenu.anchorElement) return;

    const rect = contextMenu.anchorElement.getBoundingClientRect();
    // Запоминаем, насколько клик смещён относительно левого/верхнего края карточки
    setInitialOffset({
      x: contextMenu.x - rect.left,
      y: contextMenu.y - rect.top,
    });
		setPosition({ x: contextMenu.x, y: contextMenu.y });
  }, [contextMenu.visible]);

	// Обновляем позицию при скролле
  useEffect(() => {
    if (!contextMenu.visible || !contextMenu.anchorElement) return;

    const updatePosition = () => {
			if (!contextMenu.anchorElement) return;

      const rect = contextMenu.anchorElement.getBoundingClientRect();
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
    let parent = contextMenu.anchorElement.parentElement;
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
  }, [contextMenu.visible, contextMenu.anchorElement, initialOffset]);

  // Закрытие по клику вне и Escape
  useEffect(() => {
		if (!contextMenu.visible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [contextMenu.visible]);

	return {
		menuRef,
		position,
		openModal,
		setModalMode,
		setCurrentEditLesson,
		setCurentLessonDate,
		openMenu,
		closeMenu,
		contextMenu
	}
}