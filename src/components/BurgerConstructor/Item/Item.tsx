import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Item.module.css'

import { useDispatch, useSelector } from '../../../services/hooks';
/* если оставить хук useSelector обычным, то даже если указать в дженерике useSelector<RootState>,
  то тип возвращаемого значения анонимного селектора определяется как unknown. С именнованными всё нормально */
// import { useDispatch, useSelector } from 'react-redux';

import { moveItem, removeItem } from '../../../services/slices/burgerConstructorSlice';
import { useDrag, useDrop } from 'react-dnd';
import { getSelectedProducts } from '../../../services/selectors/burgerConstructorSelector';
import { TIngredientExtraIdCounted } from '../../../utils/types';

type TProps = {
  ingredient: TIngredientExtraIdCounted;
  index: number;
};

type TDragItem = {
  data: TIngredientExtraIdCounted;
};

type TCollectedProps = {
  isDragging: boolean;
};

function Item({ ingredient, index }: TProps): JSX.Element {
  // ingredient.price = 100; - так сделать не получится, т.к. поле только для чтения
  // но ниже мы создаём новые переменные
  const { price, extraId } = ingredient;
  const text = ingredient.name;
  const thumbnail = ingredient.image_mobile || '';

  const dispatch = useDispatch();
  const selectedProducts = useSelector(getSelectedProducts);

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag<TDragItem, unknown, TCollectedProps>({
    type: 'sort',
    item: { data: ingredient },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<TDragItem, unknown, unknown>({
    accept: 'sort',
    hover: ({ data }) => {
      if (extraId === data.extraId) return;
      dispatch(moveItem({
        indexFrom: selectedProducts.indexOf(data),
        indexTo: index,
        ingredient: data,
      }));
    },
  });



  return (
    <li className={styles.item} ref={node => dragPreviewRef(dropRef(node))} >
      <div ref={dragRef} className={styles.dragIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={text}
        thumbnail={thumbnail}
        price={price}
        handleClose={() => { dispatch(removeItem(extraId)) }}
        extraClass={styles.constructorElement}
      />
    </li>
  )
}

export default Item;
