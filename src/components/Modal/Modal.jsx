import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { modalRoot } from '../../utils/modal';

import styles from './Modal.module.css';

import ModalHeader from '../ModalHeader/ModalHeader';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Modal({ children, heading, onClose, pb = 15, pt = 10 }) {
  useEffect(() => {
    const handleEsc = (evt) => {
      if (evt.key === "Escape") onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  }, []);

  return ReactDOM.createPortal((
    <>
      <div className={`${styles['modal-container']} pt-${pt} pr-10 pb-${pb} pl-10`}>
        <ModalHeader heading={heading} onClose={onClose} />
        {children}
      </div>
      <ModalOverlay onClose={onClose}/>
    </>
  ), modalRoot );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  heading: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  pb: PropTypes.string,
  pt: PropTypes.string,
}

export default Modal;
