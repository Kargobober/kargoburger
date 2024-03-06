import { FC, useEffect, useState } from 'react';
import styles from './orderPage.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../components/Price/Price';
import Item from '../components/OrderInfo/Item/Item';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from '../services/hooks';
import { getOrder } from '../services/middlewares/orderDetailsQueries';
import { getOrderFromState, getOrderIsLoading, getOrderSuccess } from '../services/selectors/orderDetailsSelector';
import { countIngredient, findIngredientObj, translateOrderStatus } from '../utils/utils';
import { StatusKind } from '../utils/api/types';
import { getIngredients, getLoadingStatus } from '../services/selectors/ingredientsSelector';
import { TIngredientExtraId, TIngredientExtraIdCounted } from '../utils/types';
import { MoonLoader } from 'react-spinners';
import useWindowSize from '../utils/hooks/useWindowSize';

const OrderPage: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const classTextHeading = windowSize.width > 850 ? 'text_type_main-medium' : 'text_type_main-small-extra';
  const classText = windowSize.width > 850 ? 'text_type_main-default' : 'text_type_main-small';

  const marginForHeading = windowSize.width > 850 ? 'mt-6 mb-2' : 'mt-6 mb-2';
  const marginForCompound = windowSize.width > 850 ? 'mt-15 mb-6' : 'mt-6 mb-4';
  const marginForFooter = windowSize.width > 850 ? 'mt-15' : '';

  const paddingForContent = windowSize.width > 850 ? 'pl-10 pr-10' : 'pl-2 pr-2';
  const paddingForFooter = windowSize.width > 850 ? 'pl-10 pr-10 pb-10' : 'pt-2 pr-2 pb-2 pl-2';

  const scrollStyle = windowSize.width > 500 ? 'custom-scroll' : 'custom-scroll_nullish';

  useEffect(() => {
    dispatch(getOrder(number!));
  }, []);

  const isLoadingOrd = useSelector(getOrderIsLoading);
  const success = useSelector(getOrderSuccess);
  const order = useSelector(getOrderFromState);
  const [statusRus, setStatusRus] = useState<string>();

  const ingredientsFromServer = useSelector(getIngredients);
  const isLoadingIngr = useSelector(getLoadingStatus);

  const [qtyOfEachIngredient, setQtyOfEachIngredient] = useState<Record<string, number>>({});
  const [ingredientsArr, setIngredientsArr] = useState<(TIngredientExtraIdCounted)[]>([]);

  useEffect(() => {
    if (isLoadingOrd === false && success && order && order.status) {
      setStatusRus(translateOrderStatus(order.status));
      const quantityOfEachIngredient = countIngredient(order.ingredients);
      setQtyOfEachIngredient(quantityOfEachIngredient);
    }
    if (isLoadingOrd === false && !order) navigate('/*');
  }, [order, isLoadingOrd, success]);

  useEffect(() => {
    if (isLoadingIngr === false
        && ingredientsFromServer
        && ingredientsFromServer.length
        && isLoadingOrd === false
        && success
        && order
        && order.status) {
      const ingredients: TIngredientExtraIdCounted[] = [];
      for (let id in qtyOfEachIngredient) {
        // ингредиенты точно найдутся, т.к. в Order.tsx вызвать модалку (а значит и передать кому-то ссылку) можно только для заказов, у которых найдены все ингредиенты
        const foundedObj = findIngredientObj(id, ingredientsFromServer) as TIngredientExtraId;
        ingredients.push({ ...foundedObj, qty: qtyOfEachIngredient[id] });
      }
      setIngredientsArr(ingredients);
    }
  }, [ingredientsFromServer.length, isLoadingIngr, order, isLoadingOrd, success, qtyOfEachIngredient]);

  if (isLoadingOrd === false && isLoadingIngr === false && success && ingredientsArr.length) return (
    <>
      <main className={styles.main}>
        <p className={`text text_type_digits-default text_centered ${styles.number}`}>#{order.number}</p>
        <h2 className={`text ${classTextHeading} ${marginForHeading} ${styles.name} ${scrollStyle}`}>{order.name}</h2>
        <p className={`text ${classText} ${order.status === StatusKind.DONE ? styles.success : ''}`}>{statusRus}</p>

        <h3 className={`text ${classTextHeading} ${marginForCompound}`}>Состав:</h3>
        <ol className={`${styles.list} listGlobal ${scrollStyle}`}>
          {ingredientsArr.map((el, i) => (<Item
            image={el.image}
            image_mobile={el.image_mobile}
            name={el.name}
            qty={el.qty}
            price={el.price}
            key={i}
            />
          ))}
        </ol>
        <div className={styles.footer}>
          <FormattedDate date={new Date(order.createdAt)} className={`text ${classText} text_color_inactive`} />
          <Price value={ingredientsArr.reduce((acc, el) => acc + el!.price, 0)} digitsSize={windowSize.width > 850 ? 'default' : 'small'} />
        </div>
      </main>
    </>
  );

  return (<MoonLoader color='#4c4cff'
    size={120}
    cssOverride={{
      marginTop: '120px',
    }}
    speedMultiplier={0.4}
  />);
};

export default OrderPage;
