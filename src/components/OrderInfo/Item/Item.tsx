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
    <li>
      <img src={image_mobile ? image_mobile : image}
        alt={name}
        className={styles.image}
      ></img>
      <h4>{name}</h4>
      <Price value={`${qty} x ${price}`} digitsSize='default' />
    </li>
  )
};

export default Item;
