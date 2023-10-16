import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import styles from './Card.module.css';

function Card({ card }) {
  const [counter, setCounter] = useState(0);

  const handleDoubleClick = useCallback(() => {
    // ++ не сработает, нужно + 1 писать
    setCounter(counter + 1);
  }, []);

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

      <div className={styles['price-container']}>
        <p className="text text_type_digits-default">
          {card.price}
        </p>
        <CurrencyIcon type="primary"/>
      </div>

      <h4 className={`text text_type_main-default ${styles.heading}`}>
        {card.name}
      </h4>

    </li>
  )
}

export default Card;
