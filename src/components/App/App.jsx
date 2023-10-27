import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { useSelector } from 'react-redux';
import { getErrorStatus } from '../../services/selectors/ingredientsSelector';

function App() {
  const isErrorOnIngredients = useSelector(getErrorStatus);

  return (
    <div className={styles.app}>
      {isErrorOnIngredients ? (
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
