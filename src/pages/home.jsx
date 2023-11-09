import styles from './home.module.css';

import AppHeader from '../components/AppHeader/AppHeader';
import Main from '../components/Main/Main';
import Modal from '../components/Modal/Modal';

import { useSelector } from 'react-redux';

import { getErrorStatus } from '../services/selectors/ingredientsSelector';
import { getOrderSuccess } from '../services/selectors/orderDetailsSelector';


function HomePage() {
  const isErrorOnIngredients = useSelector(getErrorStatus);
  const isOrderSucces = useSelector(getOrderSuccess);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main />
      {/* Если модалку рисовать взамен всего приложения, то не выполнится его код по выводу ошибок? */}
      {isErrorOnIngredients || isOrderSucces === false ? (
        <Modal>
          <p className="text text_type_main-medium mt-30">
            Произошла ошибка, пожалуйста, перезагрузите страницу.
          </p>
        </Modal>
      ) : ('')
      }
    </div>
  )
}

export default HomePage;
