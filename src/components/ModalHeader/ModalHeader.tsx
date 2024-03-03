import styles from './ModalHeader.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

type TProps = {
  heading?: string;
  onClose?: () => void;
  extraClassContainer?: string;
  /**
   * класс заголовка
   */
  extraClassHeading?: string;
  lineHeight?: string;
  /**
   * класс контейнера: заголовок + кнопка
   */
};

const ModalHeader: FC<TProps> = ({
  heading, onClose,
  extraClassHeading = `text text_type_main-large`,
  lineHeight = 'none',
  extraClassContainer,
}) => {
  return (
    <div className={`${styles['modal-header-container']} ${extraClassContainer}`}>
      <h2 className={`${styles['modal-header-container']} ${extraClassHeading}`}
        style={{lineHeight}}
      >
        {heading}
      </h2>
      <button type='button' onClick={onClose} className={styles.button}>
        <CloseIcon type='primary' />
      </button>
    </div>
  )
}

export default ModalHeader;
