import { useState } from 'react';
import { ingredientPropType } from '../../../utils/prop-types';

import styles from './Card.module.css';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../Price/Price';
import Modal from '../../Modal/Modal';
import IngredientDetails from '../../IngredientDetails/IngredientDetails';
import { addItem } from '../../../services/slices/burgerConstructorSlice';
import { useDispatch, useSelector } from 'react-redux';

function Card({ card }) {
  const counter = card.qty;
  const [needDetails, setNeedDetails] = useState();
  let waitingForDoubleClick = false;
  const dispatch = useDispatch();

  const handleClick = () => {
    setNeedDetails(true);
  }

  const handleDoubleClick = () => {
    // добавить товар в конструктор бургера
    dispatch(addItem(card));
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

  const onClose = () => {
    setNeedDetails(false);
  }

  const modal = (
    <Modal
      heading='Детали ингридиента'
      isOpen={needDetails}
      onClose={onClose}
    >
      <IngredientDetails ingredient={card} />
    </Modal>
  )

  return (
    <>
      {/* положение строки ниже важно. Когда она была внутри li, то модалка не закрывалась, т.к. реакт видимо???? не перерисовывал li из-за неизмененных пропсов в наружнем уровне (в самом li). Хотя если разместить консоль-лог, то пишет, что заходит внутрь пункта списка. А вот needDetails старое значение выводил (true), потому модалка оставалась открытой... Непонятно */}
      { needDetails && modal }
      <li className={styles.card} onClick={handleBothClick}>
        { counter > 0 && <Counter
          count={counter}
          size="default"
        />}

        <img
          className={styles.image}
          src={card.image}
          alt={card.name}
        />

        <Price value={card.price} digitsSize="default" />

        <h4 className={`text text_type_main-default ${styles.heading}`}>
          {card.name}
        </h4>

      </li>
    </>
  )
}

Card.propTypes = {
  card: ingredientPropType.isRequired,
}

export default Card;
