import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { modalRoot } from '../../utils/modal';
import styles from './Modal.module.css';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Modal({ children, heading, isOpen, onClose, pb = 15, pt = 10 }) {
  const handleEsc = (evt) => {
    if (evt.key === "Escape") onClose();
  }

  useEffect(() => {
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
      <ModalOverlay isOpen={isOpen} onClose={onClose}/>
    </>
  ), modalRoot );
}

export default Modal;
