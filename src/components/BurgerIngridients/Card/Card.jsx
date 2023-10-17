import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import styles from './Card.module.css';
import Price from '../../Price/Price';

function Card({ card, choiseCallBack }) {
  const [counter, setCounter] = useState(0);

  const handleDoubleClick = () => {
    // ++ не сработает, нужно + 1 писать
    setCounter(counter + 1);
    choiseCallBack(card);
  }

  return (
    <li className={styles.card} onDoubleClick={handleDoubleClick}>

      { counter > 0 && <Counter
        count={counter}
        size="default"
      />
      }
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
  )
}

export default Card;
