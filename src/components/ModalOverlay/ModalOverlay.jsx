import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

function ModalOverlay({ onClose }) {
  return (
      <div className={styles['modal-overlay']} onClick={onClose} />
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;
