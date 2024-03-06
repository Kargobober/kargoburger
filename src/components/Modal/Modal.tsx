import { useEffect, forwardRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { modalRoot } from '../../utils/modal';

import styles from './Modal.module.css';

import ModalHeader from '../ModalHeader/ModalHeader';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import useWindowSize from '../../utils/hooks/useWindowSize';

/**
 * @param extraClass стили для заголовка
 * @param lineHeight высота строки для заголовка
 */
type TProps = {
  heading?: string;
  onClose?: () => void;
  mode?: 'default' | 'fullWidthContent',
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
    mode = 'default',
    extraClassContainer,
    extraClassContainerOfHeading,
    extraClassHeading,
    lineHeight,
  }: TProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const windowSize = useWindowSize();

  const padingForDefault = windowSize.width > 850 ? 'pt-10 pr-10 pb-10 pl-10' : 'pt-4 pr-2 pb-4 pl-2';
  const padingForFullWidthContent = windowSize.width > 850 ? 'pt-10' : 'pt-4';
  const paddingResult = mode === 'default' ? padingForDefault : padingForFullWidthContent;

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
        className={`${styles['modal-container']} ${paddingResult} ${extraClassContainer}`}
        ref={ref}
      >
        <ModalHeader
          heading={heading}
          onClose={onClose}
          extraClassContainer={extraClassContainerOfHeading}
          extraClassHeading={extraClassHeading}
          lineHeight={lineHeight}
          mode={mode}
        />
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>
  ), modalRoot);
});

export default Modal;
