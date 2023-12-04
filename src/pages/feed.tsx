import { FC, useRef, useState, useEffect } from 'react';
import styles from './feed.module.css';
import Order from '../components/Order/Order';
import { getTopCoords } from '../utils/utils';
import { StatusKind, TOrder } from '../utils/api/types';
import { useDispatch, useSelector } from '../services/hooks';
import { connect as connectOrdersWS, disconnect as disconnectOrdersWS } from '../services/reducers/ordersWS/actions';
import { MoonLoader } from 'react-spinners';

export const ORDERS_FEED_WS_URL = 'wss://norma.nomoreparties.space/orders/all';

const FeedPage: FC = () => {
  const dispatch = useDispatch();

  const connect = () => dispatch(connectOrdersWS(ORDERS_FEED_WS_URL));
  const disconnect = () => dispatch(disconnectOrdersWS());

  useEffect(() => {
    connect();
    return () => { disconnect() };
  }, []);



  // логика доступной высота, для скролла
  const listRef = useRef<HTMLOListElement>(null);
  const [permittedHeight, setPermittedHeight] = useState(744);
  const [windowHeight, setWindowHeight] = useState<number>();
  useEffect(() => {
    if (listRef.current) {
      const sectionTopCoord = getTopCoords(listRef.current);
      setPermittedHeight(document.documentElement.clientHeight - sectionTopCoord);

      const handleWindowResize = () => {
        setWindowHeight(document.documentElement.clientHeight)
      }
      window.addEventListener('resize', handleWindowResize);
      return () => { window.removeEventListener('resize', handleWindowResize) };
    }
  }, [windowHeight]);

  const data = useSelector(state => state.ordersWS.data);
  const success = useSelector(state => state.ordersWS.data.success);

  const [completedOrders, setCompletedOrders] = useState<Omit<TOrder, "owner">[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Omit<TOrder, "owner">[]>([]);


  useEffect(() => {
    if (data && data.orders && data.orders.length && success) {
      setCompletedOrders(data.orders.filter(el => el.status === StatusKind.DONE));
      setPendingOrders(data.orders.filter(el => el.status === StatusKind.PENDING));
    }
  }, [data, success]);


  if (data && success) { return (
    <main className={`${styles.main} pl-5 pr-5`}>

      <h2 className={`text text_type_main-large pt-10 pb-5 ${styles.mainHeading}`}>Лента заказов</h2>

      <section>
        {/* h3 фикция - Список заказов */}
        <ol className={styles.ordersList + ` listGlobal custom-scroll pt-1 pb-3`} ref={listRef} style={{ height: permittedHeight }}>
          {/* h4 - заголовок каждого заказа */}
          {data.orders.map((el, i) => {
            return (
              <Order ingredients={el.ingredients}
                _id={el._id}
                number={el.number}
                createdAt={el.createdAt}
                name={el.name}
                key={el._id}
                status={el.status!}
                usageCase='feed'
              />
            )
          })}
        </ol>
      </section>

      <section className={styles.digits}>
        {/* h3 фикция - Заказы в числах */}

        <section className={styles.mainDigits}>
          {/* h4 фикция - важная информация, списки готовых заказов и заказов в работе */}

          <section className={styles.completedOrders}>
            {/* h5 - готовы */}
            <h5 className='text text_type_main-medium mb-6'>Готовы:</h5>
            <ol className={`${styles.listDone} listGlobal custom-scroll`}>
              {completedOrders.map(el => (
                <li className={`text text_type_digits-default text_color_success ${styles.item}`} key={el._id}>
                  {el.number}
                </li>
              ))}
            </ol>
          </section>
          <section className={styles.pendingOrders}>
            {/* h5 - в работе */}
            <h5 className='text text_type_main-medium  mb-6'>В работе:</h5>
            <ol className={`listGlobal ${styles.listPending} custom-scroll`}>
              {pendingOrders.map(el => (
                <li className='text text_type_digits-default' key={el._id}>
                  {el.number}
                </li>
              ))}
            </ol>
          </section>

        </section>

        <aside className={styles.asideDigits}>
          {/* h4 фикция - доп. информация */}

          <section>
            {/* h5 - выполнены за всё время */}
            <h5 className='text text_type_main-medium'>Выполнены за всё время:</h5>
            <p className={`text text_type_digits-large text_decor_shadow`}>{data.total}</p>
          </section>
          <section>
            {/* h5 - выполнены за сегодня */}
            <h5 className='text text_type_main-medium'>Выполнены за сегодня:</h5>
            <p className={`text text_type_digits-large text_decor_shadow`}>{data.totalToday}</p>
          </section>

        </aside>

      </section>

    </main>)
  }

  return (<MoonLoader color='#4c4cff'
    size={120}
    cssOverride={{
      marginTop: '120px',
    }}
    speedMultiplier={0.4}
  />)
};

export default FeedPage;
