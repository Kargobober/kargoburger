import { Link } from 'react-router-dom';
import styles from './Action.module.css';
import { FC } from 'react';
import useWindowSize from '../../../utils/hooks/useWindowSize';

type TProps = {
  placeholder?: string;
  linkText: string;
  to: string;
};

const Action: FC<TProps> = ({ placeholder, linkText, to }) => {
  const windowSize = useWindowSize();

  const classText = windowSize.width > 599 ? 'text_type_main-default' : 'text_type_main-small';

  return (
    <div className={styles.container}>
      <p className={`text text_centred ${classText} text_color_inactive`}>{placeholder}</p>
      <Link to={to} className={`text ${classText} text_color_accent linkGlobal`}>{linkText}</Link>
    </div>
  )
};

export default Action;
