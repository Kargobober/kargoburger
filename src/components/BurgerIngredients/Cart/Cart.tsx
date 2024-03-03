import { useRef, useState } from 'react';
import styles from './Cart.module.css';
import { useSelector } from '../../../services/hooks';
import useWindowSize from '../../../utils/hooks/useWindowSize';
import { getIsBunNullish, getTotalPrice } from '../../../services/selectors/burgerConstructorSelector';
import Price from '../../Price/Price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProductList from './ProductList/ProductList';

function Cart() {
  const isBunNullish = useSelector(getIsBunNullish);
  const totalPrice = useSelector(getTotalPrice);
  const windowSize = useWindowSize();

  const paddings = windowSize.width > 500 ? 'pr-3 pl-3' : 'pr-2 pl-2';

  return (
    <>
      <section className={styles.sectionProductList}>
        <ProductList />
      </section>

      <section className={`${styles.sectionBottom} pt-4 pb-4 ${paddings}`}>
        <Price
          value={totalPrice}
          svgSize={windowSize.width > 500 ? '32' : '24'}
          digitsSize={windowSize.width > 500 ? 'medium' : 'small'}
        />

        <Button
          htmlType='button'
          type='primary'
          size={windowSize.width > 500 ? 'medium' : 'small'}
          extraClass={`buttonYP_small ${isBunNullish ? '' : 'button_decor_shadow'}`}
          disabled={isBunNullish}
        >
          Заказать
        </Button>
      </section>
    </>
  )
}

export default Cart;
