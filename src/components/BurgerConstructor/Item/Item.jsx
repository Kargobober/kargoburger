import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './Item.module.css'

function Item({ text, thumbnail, price }) {
  return (
    <li className={styles.item}>
      <DragIcon type="primary" />
      <ConstructorElement text={text} thumbnail={thumbnail} price={price} />
    </li>
  )
}

Item.propTypes = {
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default Item;
