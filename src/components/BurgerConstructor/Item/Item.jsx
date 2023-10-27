import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './Item.module.css'
import { useDispatch } from 'react-redux';
import { removeItem } from '../../../services/slices/burgerConstructorSlice';

function Item({ text, thumbnail, price, extraId }) {
  const dispatch = useDispatch();
  return (
    <li className={styles.item}>
      <DragIcon type="primary" />
      <ConstructorElement text={text} thumbnail={thumbnail} price={price} handleClose={() => {dispatch(removeItem(extraId))}}/>
    </li>
  )
}

Item.propTypes = {
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default Item;
