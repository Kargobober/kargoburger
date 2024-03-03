import { useRef, useState } from 'react';
import styles from './Bottom.module.css';
import stylesTransition from './BottomTransition.module.css';
import Price from '../../Price/Price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../services/hooks';
import { getTotalPrice } from '../../../services/selectors/burgerConstructorSelector';
import useWindowSize from '../../../utils/hooks/useWindowSize';
import Modal from '../../Modal/Modal';
import { CSSTransition } from 'react-transition-group';
import Cart from '../Cart/Cart';

function Bottom() {
  const totalPrice = useSelector(getTotalPrice);
  const windowSize = useWindowSize();

  const paddings = windowSize.width > 500 ? 'pt-10 pr-3 pl-3' : 'pt-4 pr-2 pl-2';

  const refTransition = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <section className={`${styles.sectionBottom} pt-4 pl-2 pb-4 pr-2`}>
      <Price
        value={totalPrice}
        svgSize={windowSize.width > 500 ? '32' : '24'}
        digitsSize={windowSize.width > 500 ? 'medium' : 'small'}
      />

      <Button
        htmlType='button'
        type='primary'
        size={windowSize.width > 500 ? 'medium' : 'small'}
        extraClass={`buttonYP_small ${totalPrice ? 'button_decor_shadow' : ''}`}
        onClick={() => setIsModalOpen(!isModalOpen)}
        disabled={!totalPrice}
      >
        Смотреть заказ
      </Button>

      <CSSTransition
        nodeRef={refTransition}
        in={isModalOpen}
        timeout={300}
        classNames={{ ...stylesTransition }}
        unmountOnExit
      >
        <Modal
          ref={refTransition}
          key={Date.now()}
          onClose={toggleModal}
          pt={0} pr={0} pb={0} pl={0}
          heading='Заказ'
          extraClassContainer={styles.modalContainer}
          extraClassContainerOfHeading={`${paddings} ${styles.containerOfHeading}`}
          extraClassHeading={`text text_type_main-medium-extra`}
        >
          <Cart />
        </Modal>
      </CSSTransition>
    </section>
  )
}

export default Bottom;
