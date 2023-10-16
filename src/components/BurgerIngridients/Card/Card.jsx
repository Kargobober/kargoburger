import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './Card.module.css';

function Card({ card }) {
  return (
    <li className={styles.card}>

      <Counter
        count={0}
        size="default"
      />

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
