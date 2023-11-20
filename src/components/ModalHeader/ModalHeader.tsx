import PropTypes from 'prop-types';
import styles from './ModalHeader.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function ModalHeader({ heading, onClose }) {
  return (
    <div className={styles['modal-header-container']}>
      <h2 className={`${styles['modal-header-container']} text text_type_main-large`}>{heading}</h2>
      <button type='button' onClick={onClose} className={styles.button}>
        <CloseIcon type='primary' />
      </button>
    </div>
  )
}

ModalHeader.propTypes = {
  heading: PropTypes.string,
  onClose: PropTypes.func,
}

export default ModalHeader;
