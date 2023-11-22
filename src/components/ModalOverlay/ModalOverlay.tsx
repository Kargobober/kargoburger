import styles from './ModalOverlay.module.css';
import { FC } from 'react';

type TProps = {
  onClose?: () => void;
};

const ModalOverlay: FC<TProps> = ({ onClose }) => {
  return (
    <div className={styles['modal-overlay']} onClick={onClose} />
  )
}

export default ModalOverlay;
