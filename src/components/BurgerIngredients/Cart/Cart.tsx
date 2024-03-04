import styles from './Cart.module.css';
import { useDispatch, useSelector } from '../../../services/hooks';
import useWindowSize from '../../../utils/hooks/useWindowSize';
import { getSelectedBun, getSelectedProducts, getTotalPrice } from '../../../services/selectors/burgerConstructorSelector';
import Price from '../../Price/Price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProductList from './ProductList/ProductList';
import { postOrder } from '../../../services/middlewares/orderDetailsQueries';
import { useNavigate } from 'react-router';
import { getUserFromState } from '../../../services/selectors/authSelector';
import { setNeedingDetails } from '../../../services/slices/orderDetailsSlice';
import OrderDetails from '../../OrderDetails/OrderDetails';
import { getOrderDetailsNeeding, getOrderSuccess } from '../../../services/selectors/orderDetailsSelector';

function Cart() {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const navigate = useNavigate();

  const user = useSelector(getUserFromState);
  const selectedBun = useSelector(getSelectedBun);
  const totalPrice = useSelector(getTotalPrice);
  const selectedProducts = useSelector(getSelectedProducts);

  function handleOrder() {
    const assembledBurger: string[] = [];

    selectedBun && assembledBurger.push(selectedBun._id);
    assembledBurger.push(...selectedProducts.map(el => el._id));
    selectedBun && assembledBurger.push(selectedBun._id);

    if (user === null ? false : ((user.name && user.email) ? true : false)) {
      dispatch(setNeedingDetails(true));
      dispatch(postOrder({ ingredients: assembledBurger }));
    } else {
      navigate('/login');
    }
  }

  const paddings = windowSize.width > 500 ? 'pr-3 pl-3' : 'pr-2 pl-2';


  const needDetails = useSelector(getOrderDetailsNeeding);
  const isOrderSucces = useSelector(getOrderSuccess);

  if (needDetails && isOrderSucces !== false) {
    return (<OrderDetails />);
  } else {
    return (
      <>
        <section className={styles.sectionProductList}>
          <ProductList />
        </section>

        <section className={`${styles.sectionBottom} pt-4 pb-4 ${paddings}`}>
          <Price
            value={totalPrice}
            svgSize={windowSize.width > 500 ? '32' : '24'}
            digitsSize={windowSize.width > 500 ? 'medium' : 'small'}
          />

          <Button
            htmlType='button'
            type='primary'
            size={windowSize.width > 500 ? 'medium' : 'small'}
            extraClass={`${selectedBun ? 'button_decor_shadow' : ''}`}
            disabled={!selectedBun}
            onClick={handleOrder}
          >
            Заказать
          </Button>
        </section>
      </>
    )
  }
}

export default Cart;
