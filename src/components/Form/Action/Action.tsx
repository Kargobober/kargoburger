import { Link } from 'react-router-dom';
import styles from './Action.module.css';
import { FC } from 'react';

type TProps = {
  placeholder?: string;
  linkText: string;
  to: string;
};

const Action: FC<TProps> = ({ placeholder, linkText, to }) => {
  return (
    <div className={styles.container}>
      <p className='text text_centred text_type_main-default text_color_inactive'>{placeholder}</p>
      <Link to={to} className='text text_type_main-default text_color_accent linkGlobal'>{linkText}</Link>
    </div>
  )
};

export default Action;
