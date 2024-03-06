import { FC, useRef, useState, useEffect } from 'react';
import styles from './feed.module.css';
import Order from '../components/Order/Order';
import { getTopCoords } from '../utils/utils';
import { StatusKind, TOrder } from '../utils/api/types';
import { useDispatch, useSelector } from '../services/hooks';
import { connect as connectOrdersWS, disconnect as disconnectOrdersWS } from '../services/reducers/ordersWS/actions';
import { MoonLoader } from 'react-spinners';
import useWindowSize from '../utils/hooks/useWindowSize';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export const ORDERS_FEED_WS_URL = 'wss://norma.nomoreparties.space/orders/all';

const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const classTextHeading = windowSize.width > 850 ? 'text_type_main-large' : 'text_type_main-small-extra text_centered';
  const classText = windowSize.width > 850 ? 'text_type_main-medium' : 'text_type_main-small-extra';
  const classDigits = windowSize.width > 850 ? 'text_type_digits-default' : 'text_type_digits-small';
  const classDigitsTotal = windowSize.width > 850 ? 'text_type_digits-large' : 'text_type_digits-medium-extra';

  const marginForHeading = windowSize.width > 850 ? 'mt-10 mb-5' : 'mt-4 mb-2';
  const marginForText = windowSize.width > 850 ? 'mb-6' : 'mb-4';
  const marginForFooter = windowSize.width > 850 ? 'mt-15' : '';

  const paddingForContent = windowSize.width > 850 ? 'pl-10 pr-10' : 'pl-2 pr-2';
  const paddingForFooter = windowSize.width > 850 ? 'pl-10 pr-10 pb-10' : 'pt-2 pr-2 pb-2 pl-2';

  const scrollStyle = windowSize.width > 500 ? 'custom-scroll' : 'custom-scroll_nullish';

  const [currentTab, setCurrentTab] = useState('Заказы')

  const connect = () => dispatch(connectOrdersWS(ORDERS_FEED_WS_URL));
  const disconnect = () => dispatch(disconnectOrdersWS());

  useEffect(() => {
    connect();
    return () => { disconnect() };
  }, []);

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

  const sectionOrders = (
    <section className={styles.sectionOrders}>
      {/* h3 фикция - Список заказов */}
      <ol className={styles.ordersList + ` listGlobal ${scrollStyle} pt-1 pb-3`}>
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
  );

  const sectionDigits = (
    <section className={`${styles.digits} ${scrollStyle}`}>
      {/* h3 фикция - Заказы в числах */}

      <section className={styles.mainDigits}>
        {/* h4 фикция - важная информация, списки готовых заказов и заказов в работе */}

        <section className={styles.completedOrders}>
          {/* h5 - готовы */}
          <h5 className={`text ${classText} ${marginForText}`}>Готовы:</h5>
          <ol className={`${styles.listDone} listGlobal ${scrollStyle}`}>
            {completedOrders.map(el => (
              <li className={`text ${classDigits} text_color_success ${styles.item}`} key={el._id}>
                {el.number}
              </li>
            ))}
          </ol>
        </section>
        <section className={styles.pendingOrders}>
          {/* h5 - в работе */}
          <h5 className={`text ${classText}  ${marginForText}`}>В работе:</h5>
          <ol className={`listGlobal ${styles.listPending} ${scrollStyle}`}>
            {pendingOrders.map(el => (
              <li className={`text ${classDigits}`} key={el._id}>
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
          <h5 className={`text ${classText}`}>Выполнены за всё время:</h5>
          <p className={`text ${classDigitsTotal} text_decor_shadow`}>{data.total}</p>
        </section>
        <section>
          {/* h5 - выполнены за сегодня */}
          <h5 className={`text ${classText}`}>Выполнены за сегодня:</h5>
          <p className={`text ${classDigitsTotal} text_decor_shadow`}>{data.totalToday}</p>
        </section>

      </aside>

    </section>
  );

  if (data && success) {
    return (
      <main className={`${styles.main}`}>

        <h2 className={`text ${classTextHeading} ${styles.mainHeading} ${marginForHeading}`}>Лента заказов</h2>

        {windowSize.width > 1199 ? null : (
          <nav className={styles.navBar}>
            <ul className={`${styles.navList} listGlobal`}>
              <li className={styles.navItem}>
                <Tab active={currentTab === 'Заказы'} value='Заказы' onClick={setCurrentTab}>Заказы</Tab>
              </li>
              <li className={styles.navItem}>
                <Tab active={currentTab === 'Статистика'} value='Статистика' onClick={setCurrentTab}>Статистика</Tab>
              </li>
            </ul>
          </nav>
        )}

        {windowSize.width > 1199 ? (
          <>
            {sectionOrders}
            {sectionDigits}
          </>
        ) : (
          <>
            {currentTab === 'Заказы' ? sectionOrders : sectionDigits}
          </>
        )}
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
