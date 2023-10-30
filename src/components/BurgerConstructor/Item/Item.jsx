import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './Item.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { moveItem, removeItem } from '../../../services/slices/burgerConstructorSlice';
import { useDrag, useDrop } from 'react-dnd';
import { getSelectedProducts } from '../../../services/selectors/burgerConstructorSelector';
import { ingredientPropType } from '../../../utils/prop-types';

function Item({ ingredient, index }) {
  const { price, extraId } = ingredient;
  const text = ingredient.name;
  const thumbnail = ingredient.image_mobile;

  const dispatch = useDispatch();

  const selectedProducts = useSelector(getSelectedProducts);

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type: 'sort',
    item: { data: ingredient },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'sort',
    hover: ({ data }) => {
      if(extraId === data.extraId) return;
      dispatch(moveItem({
        indexFrom: selectedProducts.indexOf(data),
        indexTo: index,
        ingredient: data,
      }));
    },
  });



  return (
    <li className={`${styles.item} ${isDragging ? styles.onDrag : ''}`} ref={node => dragPreviewRef(dropRef(node))} >
      <div ref={dragRef} className={styles.dragIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement text={text} thumbnail={thumbnail} price={price} handleClose={() => {dispatch(removeItem(extraId))}}/>
    </li>
  )
}

Item.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
}

export default Item;
