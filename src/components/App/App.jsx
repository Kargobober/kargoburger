import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { useSelector } from 'react-redux';
import { getErrorStatus } from '../../services/selectors/ingredientsSelector';
import { getOrderSuccess } from '../../services/selectors/orderDetailsSelector';
import Modal from '../Modal/Modal';

function App() {
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
  );
}

export default App;
