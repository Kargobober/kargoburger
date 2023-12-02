import { useState, useRef, useEffect } from 'react';
import Order from '../../Order/Order';
import styles from './Orders.module.css';
import { getTopCoords } from '../../../utils/utils';
import { useDispatch, useSelector } from '../../../services/hooks';
import { connect as connectOrdersWS, disconnect as disconnectOrdersWS } from '../../../services/reducers/ordersWS/actions';
import { MoonLoader } from 'react-spinners';
import { getAuthPending } from '../../../services/selectors/authSelector';


const Orders = () => {
  const dispatch = useDispatch();

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



  const listRef = useRef<HTMLOListElement>(null);
  const [permittedHeight, setPermittedHeight] = useState(812);
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



  const { data } = useSelector(state => state.ordersWS);
  const success = useSelector(state => state.ordersWS.data.success);

  if (data && success) return (
    <>
      <ol className={styles.ordersList + ` listGlobal custom-scroll pt-1 pb-3`} ref={listRef} style={{ height: permittedHeight }}>
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
    </>
  )

  return (<MoonLoader color='#4c4cff'
    size={120}
    cssOverride={{
      marginTop: '120px',
    }}
    speedMultiplier={0.4}
  />)
};

export default Orders;
