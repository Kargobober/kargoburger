import { useEffect, forwardRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { modalRoot } from '../../utils/modal';

import styles from './Modal.module.css';

import ModalHeader from '../ModalHeader/ModalHeader';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

/**
 * @param extraClass стили для заголовка
 * @param lineHeight высота строки для заголовка
 */
type TProps = {
  heading?: string;
  onClose?: () => void;
  pb?: number | string;
  pt?: number | string;
  pl?: number | string;
  pr?: number | string;
  /**
   * класс модалки
   */
  extraClassContainer?: string;
  /**
   * класс контейнера шапки
   */
  extraClassContainerOfHeading?: string;
  /**
   * класс для заголовка внутри шапки
   */
  extraClassHeading?: string;
  lineHeight?: string;
  children: ReactNode;
};

const Modal = forwardRef((
  {
    children,
    heading,
    onClose,
    pt = 10,
    pr = 10,
    pb = 15,
    pl = 10,
    extraClassContainer,
    extraClassContainerOfHeading,
    extraClassHeading,
    lineHeight,
  }: TProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {

  useEffect(() => {
    if (onClose) {
      const handleEsc = (evt: KeyboardEvent) => {
        if (evt.key === "Escape") onClose();
      };
      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, []);

  return ReactDOM.createPortal((
    <>
      <div
        className={`${styles['modal-container']} pt-${pt} pr-${pr} pb-${pb} pl-${pl} ${extraClassContainer}`}
        ref={ref}
      >
        <ModalHeader
          heading={heading}
          onClose={onClose}
          extraClassContainer={extraClassContainerOfHeading}
          extraClassHeading={extraClassHeading}
          lineHeight={lineHeight}
        />
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>
  ), modalRoot);
});

export default Modal;
