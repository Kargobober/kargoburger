import { useState, useRef, useEffect } from 'react';
import Order from '../../Order/Order';
import styles from './Orders.module.css';
import { getTopCoords } from '../../../utils/utils';
import { useDispatch, useSelector } from '../../../services/hooks';
import { connect as connectOrdersWS, disconnect as disconnectOrdersWS } from '../../../services/reducers/ordersWS/actions';
import { MoonLoader } from 'react-spinners';
import { getAuthPending } from '../../../services/selectors/authSelector';
import useWindowSize from '../../../utils/hooks/useWindowSize';


const Orders = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const classTextHeading = 'text_type_main-medium-extra';
  const paddingForHeading = 'pb-4';
  const paddingForOrdersList = '';

  const authPending = useSelector(getAuthPending);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      const tokenRaw = localStorage.getItem('accessToken');
      const token = tokenRaw!.split(' ')[1];
      const ORDERS_PRIVATE_WS_URL = `wss://norma.nomoreparties.space/orders?token=${token}`;
      dispatch(connectOrdersWS(ORDERS_PRIVATE_WS_URL));
    }
  }, [authPending, localStorage]);

  const disconnect = () => dispatch(disconnectOrdersWS());

  useEffect(() => {
    return () => { disconnect() };
  }, []);

  const data = useSelector(state => state.ordersWS.data);

  if (data && data.success && data.orders.length === 0) return (
    <section className={styles.stub}>
      <h2 className='text text_type_main-default text_centered'>Вы пока не сделали ни одного заказа😮</h2>
    </section>
  )

  if (data && data.success && data.orders.length > 0) return (
    <>
      <section className={styles.sectionOrdersHistory}>
        {windowSize.width < 971 && (
          <h2 className={`text ${classTextHeading} text_centered ${paddingForHeading}`}>
            История заказов
          </h2>
        )}

        <ol
          className={[
            styles.ordersList,
            'listGlobal',
            windowSize.width < 501 ? 'custom-scroll_nullish' : 'custom-scroll',
            paddingForOrdersList
          ].join(' ')}
        >
          {data.orders.map(el => {
            return (
              <Order ingredients={el.ingredients}
                _id={el._id}
                number={el.number}
                createdAt={el.createdAt}
                name={el.name}
                key={el._id}
                status={el.status!}
                usageCase='profile/orders'
              />
            )
          })}
        </ol>
      </section>
    </>
  )

  return (
    <MoonLoader
      color='#4c4cff'
      size={120}
      cssOverride={{
        marginTop: '120px',
      }}
      speedMultiplier={0.4}
      className={styles.loader}
    />
  )
};

export default Orders;
