import { useEffect, useRef } from 'react';
import styles from './Price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { handleError } from '../../utils/utils';

type TProps = {
  value: string | number;
  digitsSize: 'default' | 'small' | 'medium' | 'large';
  svgSize?: string;
  extraStyle?: Record<string, string>;
};

const Price: FC<TProps> = ({ value, digitsSize, svgSize = '24', extraStyle }) => {
  const priceContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priceContainer.current) {
      const svg = priceContainer.current.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', svgSize);
        svg.setAttribute('height', svgSize);
      } else {
        handleError('Ошибка! Svg элемент не найден. В src/components/Price/Price.tsx');
      }
      return;
    }

    handleError('Ошибка! Элемент с ценой не найден. В src/components/Price/Price.tsx');
  });

  return (
    <div className={styles['price-container']} ref={priceContainer} style={extraStyle}>
      <p className={`text text_type_digits-${digitsSize}`}>
        {value}
      </p>
      <CurrencyIcon type="primary" />
    </div>
  )
}

export default Price;
