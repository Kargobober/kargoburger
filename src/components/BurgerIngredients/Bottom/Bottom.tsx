import { useRef, useState } from 'react';
import styles from './Bottom.module.css';
import stylesTransition from './BottomTransition.module.css';
import Price from '../../Price/Price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../../services/hooks';
import { getTotalPrice } from '../../../services/selectors/burgerConstructorSelector';
import useWindowSize from '../../../utils/hooks/useWindowSize';
import Modal from '../../Modal/Modal';
import { CSSTransition } from 'react-transition-group';
import Cart from '../Cart/Cart';
import { resetOrderNumber, setNeedingDetails } from '../../../services/slices/orderDetailsSlice';
import { getOrderDetailsNeeding, getOrderNumber } from '../../../services/selectors/orderDetailsSelector';
import { resetConstructor } from '../../../services/slices/burgerConstructorSlice';

function Bottom() {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const totalPrice = useSelector(getTotalPrice);
  const needDetailsAboutOrder = useSelector(getOrderDetailsNeeding);
  const orderNumber = useSelector(getOrderNumber);

  const paddings = windowSize.width > 500 ? 'pt-10 pr-3 pb-10 pl-3' : 'pt-4 pr-2 pb-4 pl-2';
  const textClassForModalHeading = windowSize.width > 500 ? 'text_type_main-large' : 'text_type_main-medium-extra'

  const refTransition = useRef<HTMLDivElement>(null);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    // Внутри модалки рендерится как корзина (список выбранных ингредиентов), так и детали о заказе, потому идут условные диспатчи
    if (needDetailsAboutOrder) { // если needDetailsAboutOrder = true, то пользователь пытается оформить заказ – у него в модалке рендерятся данные о совершенном заказе
      dispatch(setNeedingDetails(false)); // значит, он закрывает модалку о заказе
    }
    if (orderNumber) { // если есть номера заказа, то заказ прошёл успешно, можно очистить конструктор
      dispatch(resetConstructor());
      dispatch(resetOrderNumber());
    };
    setIsModalOpen(prev => !prev); // закрываем коммунальную модалку
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
        extraClass={`${totalPrice ? 'button_decor_shadow' : ''}`}
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
          heading={needDetailsAboutOrder ? (orderNumber ? 'Заказ оформлен' : 'Оформление заказа') : ('Заказ')}
          extraClassContainer={styles.modalContainer}
          extraClassContainerOfHeading={`${paddings} ${styles.containerOfHeading}`}
          extraClassHeading={`text ${textClassForModalHeading}`}
        >
          <Cart />
        </Modal>
      </CSSTransition>
    </section>
  )
}

export default Bottom;
