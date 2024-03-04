import { FC } from 'react';
import styles from './ProductItem.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientExtraIdCounted } from '../../../../../utils/types';
import Price from '../../../../Price/Price';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '../../../../../services/hooks';
import { moveItem } from '../../../../../services/slices/burgerConstructorSlice';
import { getSelectedProducts } from '../../../../../services/selectors/burgerConstructorSelector';

type TProps = {
  item: TIngredientExtraIdCounted;
  /**
   * индекс данного ингредиента в массиве на текущий момент, до события DnD (так?)
   */
  index?: number;
  windowSize?: { width: number, height: number };
};

type TDragItem = {
  data: TIngredientExtraIdCounted;
};

type TCollectedProps = {
  isDragging: boolean;
};

const ProductItem: FC<TProps> = ({ item, index, windowSize }) => {
  const dispatch = useDispatch();

  const textSize = windowSize ? (windowSize.width > 500 ? 'default' : 'small') : 'default';

  const selectedProducts = useSelector(getSelectedProducts);

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag<TDragItem, unknown, TCollectedProps>({
    type: 'sort',
    item: { data: item },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<TDragItem, unknown, unknown>({
    accept: 'sort',
    hover: ({ data }) => {
      if (item.extraId === data.extraId) return;
      dispatch(moveItem({
        indexFrom: selectedProducts.indexOf(data),
        indexTo: index!,
        ingredient: data,
      }));
    },
  });

  if (item === null) return null;

  return (
    <li
      className={styles.container}
      ref={node => dragPreviewRef(dropRef(node))}
    >
      <div
        className={`${styles.dragIcon} ${index !== undefined ? 'interactive' : ''}`}
        ref={index !== undefined ? dragRef : undefined}
      >
        <DragIcon
          type={item.type !== 'bun' ? 'primary' : 'secondary'}
        />
      </div>

      <img
        src={item.image}
        alt={item.name}
        className={`${styles.image} mr-2`}
      />

      <span className={`text text_type_main-${textSize} ${styles.name} mr-2`}>
        {item.name}
      </span>

      <Price
        value={item.price}
        digitsSize={windowSize && windowSize.width > 500 ? 'default' : 'small'}
        extraStyle={{
          flex: '0 0',
          // marginLeft: 'auto',
        }}
      />
    </li>
  )
};

export default ProductItem;
