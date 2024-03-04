import styles from './ProductList.module.css';
import { useDispatch, useSelector } from '../../../../services/hooks';
import { getSelectedBun, getSelectedProducts } from '../../../../services/selectors/burgerConstructorSelector';
import ProductItem from './ProductItem/ProductItem';
import useWindowSize from '../../../../utils/hooks/useWindowSize';
import SwipeableListItem from '../../../SwipeableListItem/SwipeableListItem';
import { removeItem } from '../../../../services/slices/burgerConstructorSlice';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';

function ProductList() {
  const dispatch = useDispatch();

  const windowSize = useWindowSize();
  const textSize = windowSize ? (windowSize.width > 500 ? 'default' : 'small') : 'default';

  const selectedBun = useSelector(getSelectedBun);
  const selectedProducts = useSelector(getSelectedProducts);

  const iconWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (iconWrapperRef.current) {
      const svg = iconWrapperRef.current.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', '27');
        svg.setAttribute('height', '30');
      }
    }
  }, [iconWrapperRef.current]);

  return (
    <ul className={`${styles.listOfProduct} listGlobal ${windowSize.width < 501 ? 'custom-scroll_nullish' : 'custom-scroll'}`}>
      {selectedBun ? (
        <li className={styles.item}>
          <ProductItem
            item={selectedBun}
            windowSize={windowSize}
          />
        </li>
      ) : (
        <li className={`text text_type_main-${textSize} ${styles.stub}`}>
          Добавьте булку
        </li>
      )}

      {selectedProducts.map((product, index) => (
        <SwipeableListItem
          key={product.extraId}
          onSwipe={() => dispatch( removeItem(product.extraId) )}
          threshold={0.5}
          classListItem={styles.item}
          classContent={styles.itemContent}
          classBackground={styles.itemBackground}
          background={(
            <div className={styles.iconWrapper} ref={iconWrapperRef}>
              <DeleteIcon type='primary' />
            </div>
          )}
        >
          <ProductItem
            item={product}
            index={index}
            windowSize={windowSize}
          />
        </SwipeableListItem>
      ))}

      {selectedBun ? (
        <li className={styles.item}>
          <ProductItem
            item={selectedBun}
            windowSize={windowSize}
          />
        </li>
      ) : (
        <li className={`text text_type_main-${textSize} ${styles.stub}`}>
          Хлеб всему квазар
        </li>
      )}
    </ul>
  )
}

export default ProductList;
