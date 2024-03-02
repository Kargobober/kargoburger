import { useEffect, useState, useRef } from 'react';

import styles from './BurgerConstructor.module.css';

import { findIngredientObj, getTopCoords, handleError } from '../../utils/utils';
import { useDispatch, useSelector } from '../../services/hooks';

import { BurgerIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../Price/Price';
import Item from './Item/Item';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { getSelectedBun, getSelectedProducts, getTotalPrice } from '../../services/selectors/burgerConstructorSelector';
import { getOrderDetailsNeeding, getOrderError, getOrderSuccess } from '../../services/selectors/orderDetailsSelector';
import { resetOrderNumber, setNeedingDetails } from '../../services/slices/orderDetailsSlice';
import { postOrder } from '../../services/middlewares/orderDetailsQueries';
import burgerIconSvg from '../../images/burger.svg';
import { useDrop } from 'react-dnd';
import { addItem, resetConstructor } from '../../services/slices/burgerConstructorSlice';
import { useLocation, useNavigate } from 'react-router';
import { getIngredients } from '../../services/selectors/ingredientsSelector';
import { getUserFromState } from '../../services/selectors/authSelector';
import { TIngredientCounted } from '../../utils/types';
import { TPreparedOrder } from '../Profile/LogOut/LogOutPage';
import useWindowSize from '../../utils/hooks/useWindowSize';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {width: clientWidth, height: clientHeight} = useWindowSize();
  const sectionElem = useRef<HTMLElement>(null);
  const fillingsElem = useRef<HTMLUListElement>(null);
  const [fillingsHeight, setFillingsHeight] = useState(560);

  const needDetails = useSelector(getOrderDetailsNeeding);
  const isOrderSucces = useSelector(getOrderSuccess);
  const error = useSelector(getOrderError);

  const hState: TPreparedOrder = location.state;

  const user = useSelector(getUserFromState);

  useEffect(() => {
      error && handleError('Ошибка при создании заказа: ', error);
  }, [error]);

  const modal = (
    <Modal
      onClose={onClose}
      pt='15'
      pb='30'
    >
      <OrderDetails />
    </Modal>
  );

  const ingredients = useSelector(getIngredients);
  const selectedBun = useSelector(getSelectedBun);
  const selectedProducts = useSelector(getSelectedProducts);
  const totalPrice = useSelector(getTotalPrice);

  // логика для тройного моллюска (src/components/Profile/LogOut)
  useEffect(() => {
    if (ingredients.length && hState && hState.burgConstructor.selectedBunId && hState.burgConstructor.selectedProductsId.length) {
      const selectedBun = findIngredientObj(hState.burgConstructor.selectedBunId, ingredients);
      const selectedProducts = hState.burgConstructor.selectedProductsId.map(id => findIngredientObj(id, ingredients));
      if(selectedBun) {
        // qty: 0, т.к. количество считает селектор
        dispatch(addItem({ ...selectedBun, qty: 0 }));
      }
      selectedProducts.forEach(item => { if (item) dispatch(addItem({ ...item, qty: 0 })) });
    }
  }, [ingredients.length, hState]);

  useEffect(() => {
    if(isOrderSucces) dispatch(resetConstructor());
  }, [isOrderSucces]);

  useEffect(() => {
    if (fillingsElem.current) {
      const fillingsTopCoord = getTopCoords(fillingsElem.current);
      // 52(в px) – это нижний отступ всего приложения
      // 56 - высота контентой зоны секции кнопки 'оформить заказ'
      // 40 - высота верхнего отступа секции с кнопкой "оформить заказ"
      // 80 - высота контента нижней булки
      // 16 - маргин нижней булки
      setFillingsHeight(document.documentElement.clientHeight - fillingsTopCoord - 52 - 56 - 40 - 80 - 16);
    }
  }, [clientHeight, clientWidth, fillingsElem.current, selectedProducts]);


  function handleOrder() {
    const assembledBurger = selectedProducts.map(el => el._id);
    if (selectedBun) {
      // но кнопка заказать неактивна, пока нет булочки, так что это ЕЩЁ одна проверка
      assembledBurger.push(selectedBun._id);
      assembledBurger.push(selectedBun._id);
    }
    if (user === null ? false : (user.name && user.email ? true : false)) {
      dispatch(setNeedingDetails(true));
      dispatch(postOrder({ ingredients: assembledBurger }));
    } else {
      navigate('/login');
    }
  }

  function onClose() {
    dispatch(setNeedingDetails(false));
    dispatch(resetOrderNumber());
  }


  // дропается ингредиент с новым полем - qty, а при диспатче добавляем ещё и уник. айдишник
  const [{ isHover }, dropRef] = useDrop<{card: TIngredientCounted}, unknown, {isHover: boolean}>({
    accept: 'ingredient',
    // деструктуризация объекта
    drop: ({ card }) => {
      dispatch(addItem(card));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });



  return (
    <>
      {needDetails && isOrderSucces !== false && modal}
      <section className={`${styles['section-common']} pt-25`} ref={sectionElem}>

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
          {selectedBun && (
            <div className='pl-8 pr-4'>
              <ConstructorElement
                text={`${selectedBun.name} (верх)`}
                thumbnail={selectedBun.image}
                price={selectedBun.price}
                type="top"
                extraClass={`mb-4 ${styles.bun}`}
                isLocked={true}
              />
            </div>
          )}
          {selectedProducts.length > 0 && !selectedBun && (
            <div className='pl-8 pr-4'>
              <ConstructorElement
                text='Добавьте булку'
                thumbnail={burgerIconSvg}
                price={0}
                type="top"
                extraClass={`mb-4 ${styles.bun}`}
                isLocked={true}
              />
            </div>
          )}

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
          {selectedBun && (
            <div className='pl-8 pr-4'>
              <ConstructorElement
                text={`${selectedBun.name} (низ)`}
                thumbnail={selectedBun.image}
                price={selectedBun.price}
                type="bottom"
                extraClass={`mt-4 ${styles.bun}`}
                isLocked={true}
              />
            </div>
          )}
          {selectedProducts.length > 0 && !selectedBun && (
            <div className='pl-8 pr-4'>
              <ConstructorElement
                text='Хлеб всему квазар'
                thumbnail={burgerIconSvg}
                price={0}
                type="bottom"
                extraClass={`mt-4 ${styles.bun}`}
                isLocked={true}
              />
            </div>
          )}
        </section>

        <section className={styles['price-section']}>
          <Price value={totalPrice} digitsSize='medium' svgSize='32' />
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
