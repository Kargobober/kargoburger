import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import styles from './LogOut.module.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from '../../../services/hooks';
import { getLogOutPending, getLogOutSuccess } from '../../../services/selectors/authSelector';
import { logOut } from '../../../services/middlewares/authQueries';
import { setLogOutSuccess } from '../../../services/slices/authSlice';
import { findIngredientObj } from '../../../utils/utils';
import { getIngredients } from '../../../services/selectors/ingredientsSelector';
import { addItem } from '../../../services/slices/burgerConstructorSlice';
import useWindowSize from '../../../utils/hooks/useWindowSize';

export type TLocationStateTripleMollusk = {
  needToOpenCart: boolean | null;
};

function LogOutPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const sizeOfButton = windowSize.width > 599 ? 'medium' : 'small';

  const ingredients = useSelector(getIngredients);
  const logOutPending = useSelector(getLogOutPending);
  const logOutSuccess = useSelector(getLogOutSuccess);


  const holdThisDude = () => {
    const bun = findIngredientObj('643d69a5c3f7b9001cfa093d', ingredients);
    const mollusk = findIngredientObj('643d69a5c3f7b9001cfa093f', ingredients);

    if (bun) {
      // qty: 0, т.к. количество считает селектор
      dispatch(addItem({ ...bun, qty: 0 }));
    }

    if (mollusk) {
      dispatch(addItem({ ...mollusk, qty: 0 }));
      dispatch(addItem({ ...mollusk, qty: 0 }));
      dispatch(addItem({ ...mollusk, qty: 0 }));
    }

    navigate('/', { state: {
      needToOpenCart: true,
    }});
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    if (logOutSuccess) {
      /* Проблема была в том, что человек нажимает выйти:
      - logOutSuccess становит true
      - токены удаляются
      - защищ. роут направляет меня на loginPage
      - если снова нажать "Войти", то мы обратно возвращаемся на /profile/logout (из-за <Navigate to={from} /> в ProtectedRoute),
        но т.к. я не занулял logOutSuccess, то сразу срабатывает useEffect и снова удаляет токены (logOutSuccess всё ещё true)
      */
      // Дело было НЕ в почти одинаковых названиях компонента и функции выхода
      dispatch(setLogOutSuccess(null));
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // навигировать на вход или это будет делать защищенный роут?
      // navigate('/login');
      // да, он сам снавигирует
    }
  }, [logOutSuccess]);



  return (
    <section className={styles.section}>
      <h2 className={`${styles.heading} text text_type_main-default text_centered mb-10`}>Выйти из аккаунта?</h2>
      <div className={styles.buttonsContainer}>
        <Button
          htmlType='button'
          type='primary'
          size={sizeOfButton}
          onClick={handleLogOut}
          disabled={logOutPending ? true : false}
        >
          Да
        </Button>
        <Button
          htmlType='button'
          type='secondary'
          size={sizeOfButton}
          onClick={holdThisDude}
          disabled={logOutPending ? true : false}
        >
          Попробовать моллюска!
        </Button>
      </div>
    </section>
  )
}

export default LogOutPage;
