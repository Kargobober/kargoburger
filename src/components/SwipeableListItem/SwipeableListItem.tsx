import { useRef, useEffect, FC, PropsWithChildren, ReactNode, MouseEventHandler, TouchEventHandler } from 'react';
import styles from './SwipeableListItem.module.css';

type TProps = PropsWithChildren<{
  threshold?: number;
  onSwipe?: () => void;
  classListItem?: string;
  classBackground?: string;
  background?: ReactNode;
  maxWidthBackground?: number;
  classContent?: string;

}>;

/**
 * @linkcode https://malcoded.com/posts/react-swipeable-list/
 * @linkcode https://gist.github.com/estaub/91e54880d77a9d6574b829cb0d3ba021
 */
const SwipeableListItem: FC<TProps> = ({
  maxWidthBackground = 144,
  ...props
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const listItemRef = useRef<HTMLLIElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const dragStartXRef = useRef(0);
  const leftRef = useRef(0);
  const draggedRef = useRef(false);

  useEffect(() => {
    window.addEventListener('mouseup', onDragEndMouse)
    window.addEventListener('touchend', onDragEndTouch)
    return () => {
      window.removeEventListener("mouseup", onDragEndMouse);
      window.removeEventListener("touchend", onDragEndTouch);
    }
  }, []);

  const onDragStartMouse: MouseEventHandler<HTMLDivElement> = (evt) => {
    onDragStart(evt.clientX);
    window.addEventListener('mousemove', onMouseMove);
  };

  const onDragStartTouch: TouchEventHandler<HTMLDivElement> = (evt) => {
    const touch = evt.targetTouches[0];
    onDragStart(touch.clientX);
    window.addEventListener('touchmove', onTouchMove);
  };

  function onDragStart(clientX: number) {
    draggedRef.current = true;
    dragStartXRef.current = clientX;

    if (contentRef.current) {
      contentRef.current.className = props.classContent ?? '';
    } else {
      console.log('SwipesbleListItem, попытка обработки onDragStart, но contentRef.current = null');
    };

    requestAnimationFrame(updatePosition);
  }

  function updatePosition() {
    if (draggedRef.current) {
      requestAnimationFrame(updatePosition);
    }

    if (contentRef.current) {
      if (Math.abs(leftRef.current) <= maxWidthBackground) { // ограничили уезжание контентной части
        contentRef.current.style.transform = `translateX(${leftRef.current}px)`;
      }
    } else {
      console.log('contentRef.current = null, не могу задать transform');
    }

    // Change the width and translate
    const widthForBackground = Number((Math.abs(leftRef.current)).toFixed(2));
    if (
        backgroundRef.current &&        // проверили, что реф не нулевой
        widthForBackground < maxWidthBackground &&     // проверили, что выезжающая часть не достигла максимальной ширины согласно макету
        widthForBackground.toString() + 'px' !== backgroundRef.current.style.width // проверили, что новое назначемое значение ширины не равно текущему
    ) {
      backgroundRef.current.style.width = widthForBackground.toString() + 'px'; // прошли проверки, назначаем ширину для выезжающей части
      backgroundRef.current.style.transform = `translateX(${leftRef.current}px)`; // и смещаем её тоже
    }

    if (backgroundRef.current && widthForBackground >= maxWidthBackground) {
      backgroundRef.current.style.width = `${maxWidthBackground}`;
    }
  }

  function onMouseMove(evt: MouseEvent) {
    const left = evt.clientX - dragStartXRef.current;
    if (left < 0) {
      leftRef.current = left;
    }
  }

  function onTouchMove(evt: TouchEvent) {
    const touch = evt.targetTouches[1]; // кого делаем прозрачным? второй элемент, т.к. поменял их местами относительно исходного кода автора
    const left = touch.clientX - dragStartXRef.current;
    if (left < 0) {
      leftRef.current = left;
    }
  }

  function onDragEndMouse() {
    window.removeEventListener('mousemove', onMouseMove);
    onDragEnd();
  }

  function onDragEndTouch() {
    window.removeEventListener('touchmove', onTouchMove);
    onDragEnd();
  }

  function onDragEnd() {
    if (draggedRef.current) {
      draggedRef.current = false;
      const threshold = props.threshold || 0.3;

      if (contentRef.current && leftRef.current < maxWidthBackground * -1) {
        leftRef.current = (-contentRef.current.offsetWidth * 2);

        onSwiped();
      } else {
        leftRef.current = 0;
      }

      if (contentRef.current) {
        contentRef.current.className = props.classContent ?? ''; // после попытки свайпа ставится данный класс (я оставил такой же, как до свайпа)
        contentRef.current.style.transform = `translateX(-${maxWidthBackground}px)`; // на окончание драга автор сохраняет смещение. Но я удаляю елемент из хранилища, а список рендерится по данным хранилища
      }
    }
  }

  function onSwiped() {
    if (props.onSwipe) {
      props.onSwipe();
    }
  }

  return (
    <li className={props.classListItem} ref={listItemRef}>
      <div className={props.classContent} ref={contentRef}
        onMouseDown={onDragStartMouse}
        onTouchStart={onDragStartTouch}>
        {props.children}
      </div>
      <div className={props.classBackground} ref={backgroundRef}>
        {props.background || (<span>Delete</span>)}
      </div>
    </li>
  )
}

export default SwipeableListItem;
