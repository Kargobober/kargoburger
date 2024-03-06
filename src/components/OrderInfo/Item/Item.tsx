import { FC } from 'react';
import styles from './Item.module.css';
import Price from '../../Price/Price';
import useWindowSize from '../../../utils/hooks/useWindowSize';

type TProps = {
  image: string;
  image_mobile?: string;
  name: string;
  qty: number
  price: number;
};

const Item: FC<TProps> = ({ image, image_mobile, name, qty, price }) => {
  const windowSize = useWindowSize();

  const classText = windowSize.width > 850 ? 'text_type_main-default' : 'text_type_main-small';

  return (
    <li className={styles.item}>
      <div className={styles.circle}>
        <img src={image_mobile ? image_mobile : image}
          alt={name}
          className={styles.image}
        />
      </div>
      <h4 className={`text ${classText} ${styles.heading}`}>{name}</h4>
      <Price value={`${qty} x ${price}`}
        digitsSize={windowSize.width > 850 ? 'default' : 'small'}
        extraStyle={{
          flex: '0 0 auto',
          marginLeft: 'auto',
        }}
        svgSize={windowSize.width > 850 ? '24' : '22'}
      />
    </li>
  )
};

export default Item;
