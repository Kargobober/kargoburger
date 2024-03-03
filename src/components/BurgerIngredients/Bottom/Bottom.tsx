import React from 'react';
import styles from './Bottom.module.css';
import Price from '../../Price/Price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../services/hooks';
import { getTotalPrice } from '../../../services/selectors/burgerConstructorSelector';
import useWindowSize from '../../../utils/hooks/useWindowSize';

function Bottom() {
  const totalPrice = useSelector(getTotalPrice);
  const windowSize = useWindowSize();

  return (
    <section className={`${styles.sectionBottom} pt-4 pb-4`}>
      <Price
        value={totalPrice}
        svgSize={windowSize.width > 500 ? '32' : '24'}
        digitsSize={windowSize.width > 500 ? 'medium' : 'small'}
      />
      <Button
        htmlType='button'
        type='primary'
        size={windowSize.width > 500 ? 'medium' : 'small'}
        extraClass='buttonYP_small button_decor_shadow'
      >
        Смотреть заказ
      </Button>
    </section>
  )
}

export default Bottom;
