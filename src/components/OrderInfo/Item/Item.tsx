import { FC } from 'react';
import styles from './Item.module.css';
import Price from '../../Price/Price';

type TProps = {
  image: string;
  image_mobile?: string;
  name: string;
  qty: number
  price: number;
};

const Item: FC<TProps> = ({ image, image_mobile, name, qty, price }) => {
  return (
    <li className={styles.item}>
      <div className={styles.circle}>
        <img src={image_mobile ? image_mobile : image}
          alt={name}
          className={styles.image}
        />
      </div>
      <h4 className='text text_type_main-default'>{name}</h4>
      <Price value={`${qty} x ${price}`}
        digitsSize='default'
        extraStyle={{justifySelf: 'end'}}
      />
    </li>
  )
};

export default Item;
