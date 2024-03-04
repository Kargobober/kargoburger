import styles from './ModalHeader.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import useWindowSize from '../../utils/hooks/useWindowSize';

type TProps = {
  heading?: string;
  onClose?: () => void;
  /**
   * класс контейнера: заголовок + кнопка
   */
  extraClassContainer?: string;
  /**
   * класс заголовка. Если задаёте, то об адаптивности не забудьте
   */
  extraClassHeading?: string;
  lineHeight?: string;
  svgSize?: string;
};

const ModalHeader: FC<TProps> = ({
  heading,
  onClose,
  extraClassHeading,
  lineHeight = 'none',
  extraClassContainer,
}) => {
  const windowSize = useWindowSize();
  let extraClassHeadingAdaptive: string = extraClassHeading ?? 'text text_type_main-large';
  if (!extraClassHeading && windowSize.width <= 850) extraClassHeadingAdaptive = 'text text_type_main-medium-extra';

  return (
    <div className={`${styles['modal-header-container']} ${extraClassContainer}`}>
      <h2 className={`${styles['modal-header-container']} ${extraClassHeadingAdaptive} mr-3`}
        style={{lineHeight}}
      >
        {heading}
      </h2>
      <button type='button' onClick={onClose} className={styles.button}>
        <CloseIcon type='primary' />
      </button>
    </div>
  )
}

export default ModalHeader;
