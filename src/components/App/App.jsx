import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { useSelector } from 'react-redux';
import { getErrorStatus } from '../../services/selectors/ingridientsSelector';

function App() {
  const isErrorOnIngridients = useSelector(getErrorStatus);

  return (
    <div className={styles.app}>
      {isErrorOnIngridients ? (
        <p className="text text_type_main-medium mt-30">
          Произошла ошибка, пожалуйста, перезагрузите страницу.
          </p>
      ) : (
        <>
          <AppHeader />
          <Main />
        </>
      )}
    </div>
  );
}

export default App;
