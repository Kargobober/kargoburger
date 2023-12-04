import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import styles from './LogOut.module.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from '../../../services/hooks';
import { getLogOutPending, getLogOutSuccess } from '../../../services/selectors/authSelector';
import { logOut } from '../../../services/middlewares/authQueries';
import { setLogOutSuccess } from '../../../services/slices/authSlice';

export type TPreparedOrder = {
  burgConstructor: {
    selectedBunId: string;
    selectedProductsId: string[];
  };
};

function LogOutPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutPending = useSelector(getLogOutPending);
  const logOutSuccess = useSelector(getLogOutSuccess);


  const holdThisDude = () => {
    navigate('/', {
      state: {
        burgConstructor: {
          selectedBunId: '643d69a5c3f7b9001cfa093d',
          selectedProductsId: [
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093f',
          ],
        },
      },
    });
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
          size='medium'
          onClick={handleLogOut}
          disabled={logOutPending ? true : false}
        >
          Да
        </Button>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
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
