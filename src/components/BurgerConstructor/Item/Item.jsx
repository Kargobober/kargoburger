import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './Item.module.css'

function Item({ text, thumbnail, price }) {
  return (
    <li className={styles.item}>
      <DragIcon type="primary" />
      <ConstructorElement text={text} thumbnail={thumbnail} price={price} />
    </li>
  )
}

export default Item;
