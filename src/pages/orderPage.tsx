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

const OrderPage: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        // ингредиент точно найдутся, т.к. в Order.tsx вызвать модалку (а значит и передать кому-то ссылку) можно только для заказов, у которых найдены все ингредиенты
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
        <h2 className={`text text_type_main-medium mb-2 mt-5 ${styles.name} custom-scroll`}>{order.name}</h2>
        <p className={`text text_type_main-default ${order.status === StatusKind.DONE ? styles.success : ''}`}>{statusRus}</p>

        <h3 className='text text_type_main-medium mt-15 mb-6'>Состав:</h3>
        <ol className={`mb-10 ${styles.list} listGlobal custom-scroll`}>
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
          <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
          <Price value={ingredientsArr.reduce((acc, el) => acc + el!.price, 0)} digitsSize='default' />
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
