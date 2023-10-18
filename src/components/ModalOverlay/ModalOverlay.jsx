import styles from './ModalOverlay.module.css';

function ModalOverlay({ onClose }) {
  return (
      <div className={styles['modal-overlay']} onClick={onClose} />
  )
}

export default ModalOverlay;
