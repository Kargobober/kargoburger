import styles from './ModalHeader.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

type TProps = {
  heading?: string;
  onClose?: () => void;
  extraClass?: string;
  lineHeight?: string;
};

const ModalHeader: FC<TProps> = ({ heading, onClose, extraClass = `text text_type_main-large`, lineHeight = 'none' }) => {
  return (
    <div className={styles['modal-header-container']}>
      <h2 className={`${styles['modal-header-container']} ${extraClass}`}
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
