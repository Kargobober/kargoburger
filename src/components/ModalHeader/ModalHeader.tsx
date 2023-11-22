import styles from './ModalHeader.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

type TProps = {
  heading?: string,
  onClose?: () => void,
};

const ModalHeader: FC<TProps> = ({ heading, onClose }) => {
  return (
    <div className={styles['modal-header-container']}>
      <h2 className={`${styles['modal-header-container']} text text_type_main-large`}>{heading}</h2>
      <button type='button' onClick={onClose} className={styles.button}>
        <CloseIcon type='primary' />
      </button>
    </div>
  )
}

export default ModalHeader;
