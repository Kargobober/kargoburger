import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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

Price.propTypes ={
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  digitsSize: PropTypes.oneOf(['default', 'medium', 'large']).isRequired,
  svgSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default Price;
