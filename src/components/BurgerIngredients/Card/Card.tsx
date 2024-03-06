import { SyntheticEvent, memo } from 'react';
import { TIngredientCounted } from '../../../utils/types';

import styles from './Card.module.css';

import { Button, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../Price/Price';
import { addItem } from '../../../services/slices/burgerConstructorSlice';
import { useDispatch } from '../../../services/hooks';
import { v4 as uuidv4 } from 'uuid';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import useWindowSize from '../../../utils/hooks/useWindowSize';

type TCollectedProps = {
  isDragging: boolean;
};

/* пропс card передаётся из компонента List, а в нём он берется из селектора,
  который добавляет поле qty — число шт. данного ингредиента в конструкторе */
function Card({ card }: { card: TIngredientCounted }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const windowSize = useWindowSize();
  const typographyForHeading = windowSize.width > 500 ? 'text_type_main-default' : 'text_type_main-small';
  const typographyForPrice = windowSize.width > 500 ? 'text_type_main-default' : 'text_type_main-small';

  const counter = card.qty;
  let waitingForDoubleClick: NodeJS.Timeout | undefined;

  // при перетаскивании extraId добавляется только при дропе ингредиента, см. useDrop в ....\components\BurgerConstructor\BurgerConstructor.tsx
  const [{ isDragging }, dragRef, preview] = useDrag<{card: TIngredientCounted}, unknown, TCollectedProps>({
    type: 'ingredient',
    // объект { card: card }
    item: { card },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    navigate(`ingredients/${card._id}`, {
      state: { background: location },
    });
  };

  const handleDoubleClick = () => {
    // добавить товар в конструктор бургера
    dispatch(addItem(card));
  };

  const handleBothClick = (evt: React.MouseEvent) => {
    // в detail хранится число кликов
    if (evt.detail === 1) {
      /* setTimeout возвращает число со значением времени задержки в секундах
        (неужели значение переменной будет обновляться каждый момент времени, пока не достигнет порога?) */
      waitingForDoubleClick = setTimeout(() => {
        handleClick();
      }, 300);
    } else {
      // число большее нуля не равно false
      if (waitingForDoubleClick) {
        clearTimeout(waitingForDoubleClick);
        waitingForDoubleClick = undefined;
      }
      handleDoubleClick();
    }
  };

  const handleAddition = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    dispatch(addItem(card));
  };



  return (
    <li className={!isDragging ? styles.card : `${styles.card} ${styles.outline}`}
      onClick={handleBothClick}
      ref={windowSize.width > 1050 ? dragRef : null}
    >
      {counter > 0 && <Counter
        count={counter}
        size={windowSize.width > 500 ? 'default' : 'small'}
      />}

      <DragPreviewImage connect={preview} src={card.image} />
      <img
        className={!isDragging ? styles.image : `${styles.image} ${styles.dragging}`}
        src={card.image}
        alt={card.name}
      />

      <Price value={card.price} digitsSize={windowSize.width > 500 ? 'default' : 'small'} />

      <h4 className={`text ${typographyForHeading} ${styles.heading}`}>
        {card.name}
      </h4>

      {windowSize.width > 1050 ? null : (
        <Button
          htmlType='button'
          type='secondary'
          size='small'
          extraClass={`${styles.buttonAdd}`}
          onClick={(e) => handleAddition(e)}
        >
          Добавить
        </Button>
      )}
    </li>
  )
}

export default memo(Card);
