import { useEffect, useRef } from 'react';

import styles from './BurgerConstructor.module.css';

import { handleError } from '../../utils/utils';
import { useDispatch, useSelector } from '../../services/hooks';

import { BurgerIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../Price/Price';
import Item from './Item/Item';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { getSelectedBun, getSelectedProducts, getTotalPrice } from '../../services/selectors/burgerConstructorSelector';
import { getOrderDetailsNeeding, getOrderError, getOrderSuccess } from '../../services/selectors/orderDetailsSelector';
import { resetOrderNumber, setNeedingDetails } from '../../services/slices/orderDetailsSlice';
import burgerIconSvg from '../../images/burger.svg';
import { useDrop } from 'react-dnd';
import { addItem, resetConstructor } from '../../services/slices/burgerConstructorSlice';
import { useNavigate } from 'react-router';
import { getUserFromState } from '../../services/selectors/authSelector';
import { TIngredientCounted } from '../../utils/types';
import useWindowSize from '../../utils/hooks/useWindowSize';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const paddingForModal = {
    pt: windowSize.width > 1049 ? '15' : 'неважно', // для 'pt-...'
    pb: windowSize.width > 1049 ? '30' : 'в-другом-месте-код',
    // При меньших размерах экрана (до 1050) используется код order details, описанный внутри: BurgerIngridients > Bottom > Cart.tsx.
    // Относительно DOM модалка располагается в том же реактовском портале.
  };

  const sectionElem = useRef<HTMLElement>(null);
  const fillingsElem = useRef<HTMLUListElement>(null);

  const needDetails = useSelector(getOrderDetailsNeeding);
  const isOrderSucces = useSelector(getOrderSuccess);
  const error = useSelector(getOrderError);

  const user = useSelector(getUserFromState);

  useEffect(() => {
    error && handleError('Ошибка при создании заказа: ', error);
  }, [error]);

  const modal = (
    <Modal
      onClose={onClose}
      pt={paddingForModal.pt}
      pb={paddingForModal.pb}
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

  function handleOrder() {
    const assembledBurger: string[] = []; // массив айдишек ингредиентов

    if (selectedBun) assembledBurger.push(selectedBun._id); // но кнопка заказать неактивна, пока нет булочки, так что это ЕЩЁ одна проверка
    assembledBurger.push(...selectedProducts.map(el => el._id));
    if (selectedBun) assembledBurger.push(selectedBun._id);

    if (user === null ? false : (user.name && user.email ? true : false)) {
      dispatch(setNeedingDetails(true));
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
      <section className={`${styles.sectionCommon} pt-25 pb-5`} ref={sectionElem}>

        <section ref={dropRef} className={isHover ? `${styles.sectionConstructor} ${styles.dropTarget}` : styles.sectionConstructor}>

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
          <ul className={`${styles.listOfFillings} custom-scroll`} ref={fillingsElem}>
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

        <section className={styles.sectionPrice}>
          <Price value={totalPrice} digitsSize='medium' svgSize='32' />
          <Button htmlType="button" type="primary" size="medium"
            onClick={handleOrder}
            disabled={!selectedBun}
            extraClass={selectedBun ? 'button_decor_shadow' : ''}
          >
            Оформить заказ
          </Button>
        </section>

      </section>
    </>
  )
}

export default BurgerConstructor;
