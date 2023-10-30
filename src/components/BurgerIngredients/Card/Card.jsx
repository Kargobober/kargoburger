import { memo } from 'react';
import { ingredientPropType } from '../../../utils/prop-types';

import styles from './Card.module.css';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../Price/Price';
import { addItem } from '../../../services/slices/burgerConstructorSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setInfo } from '../../../services/slices/ingredientDetailsSlice';
import { useDrag } from 'react-dnd';


function Card({ card }) {
  const counter = card.qty;
  let waitingForDoubleClick = false;
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type: 'ingredient',
    item: { card },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    // записываем в хранилище данные ингридиента
    dispatch(setInfo(card));
  }

  const handleDoubleClick = () => {
    // добавить товар в конструктор бургера
    dispatch(addItem({
      ...card,
      extraId: uuidv4(),
    }));
  }

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
  }



  return (
    <li className={!isDragging ? styles.card : `${styles.card} ${styles.outline}`}
      onClick={handleBothClick}
      ref={dragRef} >
      {counter > 0 && <Counter
        count={counter}
        size="default"
      />}

      <img
        className={!isDragging ? styles.image : `${styles.image} ${styles.dragging}`}
        src={card.image}
        alt={card.name}
        ref={dragPreviewRef}
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
