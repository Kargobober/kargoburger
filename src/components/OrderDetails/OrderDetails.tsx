import styles from './OrderDetails.module.css';
import orderAcceptedSvg from '../../images/order-accepted.svg';
import { useSelector } from '../../services/hooks';
import { getOrderIsLoading, getOrderNumber, getOrderSuccess } from '../../services/selectors/orderDetailsSelector';
import { MoonLoader } from 'react-spinners';
import { colorInterfaceAccent } from '../../utils/constants';

function OrderDetails(): JSX.Element {
  const orderNumber = useSelector(getOrderNumber);
  const isLoading = useSelector(getOrderIsLoading);
  const success = useSelector(getOrderSuccess);


  return (
    <div className={`${styles.container}`}>
      <h3 className={`text text_type_digits-large ${styles.heading} text_decor_shadow`}>{orderNumber ? orderNumber : ' . . . . . '}</h3>
      <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
      {!isLoading && success ? (
        <img src={orderAcceptedSvg} alt="Статус заказа" className='mt-15 mb-15' />
      ) : (
        <MoonLoader
          color={colorInterfaceAccent}
          size={102}
          cssOverride={{
            marginTop: '60px',
            marginBottom: '60px',
          }}
          speedMultiplier={0.4}
        />
      )}
      <p className='text text_type_main-default'>
        {!isLoading && success ? 'Ваш заказ начали готовить' : 'Создаём заказ...'}
      </p>
      {!isLoading && success ? (
        <p className='text text_type_main-default text_color_inactive mt-2'>
          Дождитесь готовности на орбитальной станции
        </p>
      ) : (
        <div className={styles.stub} />
      )}
    </div>
  )
}

export default OrderDetails;
