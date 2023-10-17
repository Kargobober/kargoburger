import { useEffect, useRef } from 'react';
import styles from './Price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Price({ value, digitsSize, svgSize = 24 }) {
  const priceContainer = useRef();

  useEffect(() => {
    const svg = priceContainer.current.querySelector('svg');
    svg.setAttribute('width', svgSize);
    svg.setAttribute('height', svgSize);
  })

  return (
    <div className={styles['price-container']} ref={priceContainer}>
        <p className={`text text_type_digits-${digitsSize}`}>
          {value}
        </p>
        <CurrencyIcon type="primary"/>
      </div>
  )
}

export default Price;
