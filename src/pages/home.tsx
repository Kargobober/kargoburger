import Main from '../components/Main/Main';
import Modal from '../components/Modal/Modal';

import { useDispatch, useSelector } from 'react-redux';

import { getErrorStatus } from '../services/selectors/ingredientsSelector';
import { getOrderSuccess } from '../services/selectors/orderDetailsSelector';

function HomePage(): JSX.Element {
  const isErrorOnIngredients = useSelector(getErrorStatus) as boolean;
  const isOrderSucces = useSelector(getOrderSuccess) as boolean | undefined;
  const dispatch = useDispatch();
  return (
    <>
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
    </>
  )
}

export default HomePage;
