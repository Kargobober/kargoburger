import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './ModalHeader.module.css';

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

export default ModalHeader;
