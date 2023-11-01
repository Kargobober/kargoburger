import { useEffect, useState, useRef } from 'react';

import styles from './BurgerConstructor.module.css';

import { getTopCoords, handleError } from '../../utils/utils';

import { BurgerIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../Price/Price';
import Item from './Item/Item';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedBun, getSelectedProducts, getTotalPrice } from '../../services/selectors/burgerConstructorSelector';
import { getOrderDetailsNeeding, getOrderError, getOrderSuccess } from '../../services/selectors/orderDetailsSelector';
import { resetOrderNumber, setNeedingDetails } from '../../services/slices/orderDetailsSlice';
import { postOrder } from '../../services/middlewares/orderDetailsQueries';
import burgerIconSvg from '../../images/burger.svg';
import { useDrop } from 'react-dnd';
import { addItem, resetConstructor } from '../../services/slices/burgerConstructorSlice';
import { v4 as uuidv4 } from 'uuid';

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
  const error = useSelector(getOrderError);

  useEffect(() => {
    error && handleError('Ошибка при создании заказа: ', error.message);
  }, [error]);

  const modal = (
    <Modal
      heading=''
      onClose={onClose}
      pt='15'
      pb='30'
    >
      <OrderDetails />
    </Modal>
  );

  const selectedBun = useSelector(getSelectedBun);
  const selectedProducts = useSelector(getSelectedProducts);
  const totalPrice = useSelector(getTotalPrice);

  useEffect(() => {
    if(isOrderSucces) dispatch(resetConstructor());
  }, [isOrderSucces]);

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
    dispatch(resetOrderNumber());
  }



  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    // деструктуризация объекта
    drop: ({ card }) => {
      dispatch(addItem({
        ...card,
        extraId: uuidv4(),
      }));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });



  return (
    <>
      {needDetails && isOrderSucces !== false && modal}
      <section className={`${styles['section-common']} pt-25`} ref={sectionElem} style={{ maxHeight: sectionHeight }}>

        <section ref={dropRef} className={isHover ? `${styles.innerSection} ${styles.dropTarget}` : styles.innerSection}>

          {!selectedBun && selectedProducts.length === 0 &&
            <div className={styles.stub}>
              <BurgerIcon type='secondary' />
              <p className={`text text_type_main-default text_color_inactive ${styles.stubText}`}>
                {` Добавьте ингредиенты двойным кликом \n или перетаскиванием `}
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
            extraClass={`mb-4 ml-8 ${styles.bun}`}
            isLocked="true"
          />}
          {selectedProducts.length > 0 && !selectedBun && <ConstructorElement
            text='Добавьте булку'
            thumbnail={burgerIconSvg}
            price='0'
            type="top"
            extraClass={`mb-4 ml-8 ${styles.bun}`}
            isLocked="true"
          />}

          {/* внутренности бургера */}
          <ul className={`${styles.list} custom-scroll`} ref={fillingsElem} style={{ maxHeight: fillingsHeight }}>
            {selectedProducts.length > 0
              && selectedProducts.map((el, index) => <Item
                key={el.extraId}
                ingredient={el}
                index={index}
              />)
            }
          </ul>

          {/* нижняя булочка */}
          {selectedBun && <ConstructorElement
            text={`${selectedBun.name} (низ)`}
            thumbnail={selectedBun.image}
            price={selectedBun.price}
            type="bottom"
            extraClass={`mt-4 ml-8 ${styles.bun}`}
            isLocked="true"
          />}
          {selectedProducts.length > 0 && !selectedBun && <ConstructorElement
            text='Хлеб всему квазар'
            thumbnail={burgerIconSvg}
            price='0'
            type="bottom"
            extraClass={`mt-4 ml-8 ${styles.bun}`}
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
