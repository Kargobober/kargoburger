import styles from './OrderDetails.module.css';
import orderAcceptedSvg from '../../images/order-accepted.svg';

function OrderDetails() {

  return (
    <div className={`${styles.container}`}>
      <h3 className={`text text_type_digits-large ${styles.heading}`}>cb2007</h3>
      <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
      <img src={orderAcceptedSvg} alt="Статус заказа" className='mt-15 mb-15'/>
      <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;
