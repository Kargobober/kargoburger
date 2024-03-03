import { FC } from 'react';
import styles from './ProductItem.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientExtraIdCounted } from '../../../../../utils/types';
import Price from '../../../../Price/Price';

type TProps = {
  item: TIngredientExtraIdCounted | null;
  windowSize?: { width: number, height: number };
};

const ProductItem: FC<TProps> = ({ item, windowSize }) => {
  const textSize = windowSize ? (windowSize.width > 500 ? 'default' : 'small') : 'default';

  if (item === null) return null;

  return (
    <li className={styles.container}>
      <DragIcon type='primary' />

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
