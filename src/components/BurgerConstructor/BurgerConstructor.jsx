import { useEffect, useState, useRef, useMemo } from 'react';

import styles from './BurgerConstructor.module.css';

import { getTopCoords } from '../../utils/utils';

import { BurgerIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../Price/Price';
import Item from './Item/Item';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedBun, getSelectedProducts, getTotalPrice } from '../../services/selectors/burgerConstructorSelector';
import { getOrderDetailsNeeding, getOrderErrorMessage, getOrderSuccess } from '../../services/selectors/orderDetailsSelector';
import { setNeedingDetails } from '../../services/slices/orderDetailsSlice';
import { postOrder } from '../../services/middlewares/orderDetailsQueries';
import burgerIconSvg from '../../images/burger.svg';

function BurgerConstructor() {
  // сохраняем высоту окна в стэйт, чтобы при ее изменении перерисовывать компонент с новой доступной ему высотой
  const [windowHeight, setWindowHeight] = useState();
  const sectionElem = useRef();
  const fillingsElem = useRef();
  const [sectionHeight, setSectionHeight] = useState(912);
  const [fillingsHeight, setFillingsHeight] = useState(560);
  const dispatch = useDispatch();

  const needDetails = useSelector(getOrderDetailsNeeding);
  const isOrderSucces = useSelector(getOrderSuccess);
  const modal = (
    <Modal
      heading=''
      onClose={onClose}
      pt='15'
      pb='30'
    >
      <OrderDetails />
    </Modal>
  )

  const selectedBun = useSelector(getSelectedBun);
  const selectedProducts = useSelector(getSelectedProducts);
  const totalPrice = useSelector(getTotalPrice);

  useEffect(() => {
    // Получаем координаты верха секции конструктора
    const sectionTopCoord = getTopCoords(sectionElem.current);
    // Назначаем доступную высоту для секции, чтобы не появлялся скролл всего приложения
    // 40(в px) – это нижний отступ всего приложения
    setSectionHeight(document.documentElement.clientHeight - sectionTopCoord - 40);

    const fillingsTopCoord = getTopCoords(fillingsElem.current);
    // 292px - хардкод, суммарная высота элементов и отступов под списком начинок
    setFillingsHeight(document.documentElement.clientHeight - fillingsTopCoord - 292);

    const handleWindowResize = () => {
      setWindowHeight(document.documentElement.clientHeight)
    }
    window.addEventListener('resize', handleWindowResize);
    return () => { window.removeEventListener('resize', handleWindowResize) };
  }, [windowHeight]);


  function handleOrder() {
    const assembledBurger = selectedProducts.map(el => el._id);
    assembledBurger.push(selectedBun._id);
    assembledBurger.push(selectedBun._id);
    dispatch(setNeedingDetails(true));
    dispatch(postOrder(assembledBurger));
  }

  function onClose() {
    dispatch(setNeedingDetails(false));
  }

  return (
    <>
      {needDetails && isOrderSucces !== false && modal}
      <section className={`${styles['section-common']} pt-25`} ref={sectionElem} style={{ maxHeight: sectionHeight }}>

        <section>

          {!selectedBun && selectedProducts.length === 0 &&
            <div className={styles.stub}>
              <BurgerIcon type='secondary' />
              <p className='text text_type_main-default text_color_inactive'>
                &nbsp;Добавьте ингридиенты двойным кликом&nbsp;
              </p>
              <BurgerIcon type='secondary' />
            </div>
          }

          {/* верхняя булка */}
          {selectedBun && <ConstructorElement
            text={`${selectedBun.name} (верх)`}
            thumbnail={selectedBun.image}
            price={selectedBun.price}
            type="top"
            extraClass="mb-4 ml-8"
            isLocked="true"
          />}
          {selectedProducts.length > 0 && !selectedBun && <ConstructorElement
          text='Добавьте булку'
          thumbnail={burgerIconSvg}
          price='0'
          type="top"
          extraClass="mb-4 ml-8"
          isLocked="true"
          />}

          {/* внутренности бургера */}
          <ul className={`${styles.list} custom-scroll`} ref={fillingsElem} style={{ maxHeight: fillingsHeight }}>
            {selectedProducts.length > 0
              && selectedProducts.map(el => <Item
                key={el.extraId}
                extraId={el.extraId}
                text={el.name}
                thumbnail={el.image_mobile}
                price={el.price}
              />)
            }
          </ul>

          {/* нижняя булочка */}
          {selectedBun && <ConstructorElement
            text={`${selectedBun.name} (низ)`}
            thumbnail={selectedBun.image}
            price={selectedBun.price}
            type="bottom"
            extraClass="mt-4 ml-8"
            isLocked="true"
          />}
          {selectedProducts.length > 0 && !selectedBun && <ConstructorElement
          text='Хлеб всему квазар'
          thumbnail={burgerIconSvg}
          price='0'
          type="bottom"
          extraClass="mb-4 ml-8"
          isLocked="true"
          />}
        </section>

        <section className={styles['price-section']}>
          <Price value={totalPrice} digitsSize='medium' svgSize="32" />
          <Button htmlType="button" type="primary" size="medium"
            onClick={handleOrder}
            disabled={!selectedBun}>
            Оформить заказ
          </Button>
        </section>

      </section>
    </>
  )
}

export default BurgerConstructor;
