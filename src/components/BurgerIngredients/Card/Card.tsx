import { memo } from 'react';
import { ingredientPropType } from '../../../utils/types';

import styles from './Card.module.css';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../Price/Price';
import { addItem } from '../../../services/slices/burgerConstructorSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { Link, useLocation, useNavigate } from 'react-router-dom';


function Card({ card }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const counter = card.qty;
  let waitingForDoubleClick = false;

  const [{ isDragging }, dragRef, preview] = useDrag({
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
    dispatch(addItem({
      ...card,
      extraId: uuidv4(),
    }));
  };

  const handleBothClick = (evt) => {
    // в detail хранится число кликов
    if (evt.detail === 1) {
      // setTimeout возвращает число со значением времени задержки в секундах (неужели значение переменной будет обновляться каждый момент времени, пока не достигнет порога?)
      waitingForDoubleClick = setTimeout(() => {
        handleClick();
      }, 300);
    } else {
      // число большее нуля не равно false
      if (waitingForDoubleClick) {
        clearTimeout(waitingForDoubleClick);
        waitingForDoubleClick = false;
      }
      handleDoubleClick();
    }
  };



  return (
    <li className={!isDragging ? styles.card : `${styles.card} ${styles.outline}`}
      onClick={handleBothClick}
      ref={dragRef}
    >
      {counter > 0 && <Counter
        count={counter}
        size="default"
      />}

      <DragPreviewImage connect={preview} src={card.image} />
      <img
        className={!isDragging ? styles.image : `${styles.image} ${styles.dragging}`}
        src={card.image}
        alt={card.name}
      />

      <Price value={card.price} digitsSize="default" />

      <h4 className={`text text_type_main-default ${styles.heading}`}>
        {card.name}
      </h4>
    </li>
  )
}

Card.propTypes = {
  card: ingredientPropType.isRequired,
}

export default memo(Card);
