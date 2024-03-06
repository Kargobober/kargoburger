// КОНТЕНТ МОДАЛКИ ПРИ НАЖАТИИ "ОФОРМИТЬ ЗАКАЗ". Инфа о только что сделанном заказе

import styles from './OrderDetails.module.css';
import orderAcceptedSvg from '../../images/order-accepted.svg';
import { useSelector } from '../../services/hooks';
import { getOrderIsLoading, getOrderNumber, getOrderSuccess } from '../../services/selectors/orderDetailsSelector';
import { MoonLoader } from 'react-spinners';
import { colorInterfaceAccent } from '../../utils/constants';
import useWindowSize from '../../utils/hooks/useWindowSize';

function OrderDetails(): JSX.Element {
  const windowSize = useWindowSize();

  const textClassForOrderNumber = windowSize.width > 550 ? 'text_type_digits-large' : 'text_type_digits-medium-extra';
  const textClassForIdentificator = windowSize.width > 550 ? 'text_type_main-medium' : 'text_type_main-small-extra';
  const classText = windowSize.width > 550 ? 'text_type_main-default' : 'text_type_main-small';

  const orderNumber = useSelector(getOrderNumber);
  const isLoading = useSelector(getOrderIsLoading);
  const success = useSelector(getOrderSuccess);


  return (
    <div className={`${styles.container}`}>
      <h3 className={`text ${textClassForOrderNumber} ${styles.heading} text_decor_shadow`}>{orderNumber ? orderNumber : ' . . . . . '}</h3>
      <p className={`text ${textClassForIdentificator} text_centered mt-8`}>идентификатор заказа</p>
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
      <p className={`text ${classText} text_centered`}>
        {!isLoading && success ? 'Ваш заказ начали готовить' : 'Создаём заказ...'}
      </p>
      {!isLoading && success || 1 ? (
        <p className={`text ${classText} text_centered text_color_inactive mt-2`}>
          Дождитесь готовности на орбитальной станции
        </p>
      ) : (
        <div className={styles.stub} />
      )}
    </div>
  )
}

export default OrderDetails;
