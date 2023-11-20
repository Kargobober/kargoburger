import { useEffect, useRef, useState, forwardRef, useImperativeHandle, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './List.module.css';

import { getTopCoords, handleError } from '../../../utils/utils';

import Card from '../Card/Card';
import { getCountedFiltredIngredients, getErrorStatus, getLoadingStatus } from '../../../services/selectors/ingredientsSelector';
import { ingredientsQuery } from '../../../services/middlewares/ingredientsQuery';

// первый параметр нельзя удалить. Второй параметр появляется из-за дальнейшей обёртки в forwardRef
function List(props, ref) {
  const dispatch = useDispatch();

  const listRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainFillingsRef = useRef();
  useImperativeHandle(ref, () => ({
    get list() {
      return listRef.current;
    },
    get buns() {
      return bunsRef.current;
    },
    get sauces() {
      return saucesRef.current;
    },
    get mainFillings() {
      return mainFillingsRef.current;
    },
  }));



  const isLoading = useSelector(getLoadingStatus);
  const hasError = useSelector(getErrorStatus);
  useEffect(() => {
    hasError && handleError('Ошибка при загрузке ингредиентов с сервера.');
  }, [hasError]);

  useEffect(() => {
    dispatch(ingredientsQuery());
  }, []);
  // Получаем обработанные данные из хранилища, сам результат обработки в хранилище не хранится. Не знаю, верно ли это
  const data = useSelector(getCountedFiltredIngredients);



  // При текущей системе оступов (единица = 4px) подходящая высота секции около 616px (через девтулзы можно обнаружить высоту на которой появляется скролл)
  // Автоматический расчет доступной высоту выдаёт 616,406. Так что всё чётко - как в больнице :)
  const [permittedHeight, setPermittedHeight] = useState(616);
  const [windowHeight, setWindowHeight] = useState();
  useEffect(() => {
    // Получаем координаты верха секции с карточками
    const sectionTopCoord = getTopCoords(listRef.current);
    // Назначаем доступную высоту для секции, чтобы не появлялся скролл всего приложения
    // 40(в px) – это нижний отступ всего приложения
    // В стилях тем не менее задаем мин. высоту, чтобы было видно хотя бы один ряд карточек целиком
    setPermittedHeight(document.documentElement.clientHeight - sectionTopCoord - 40);

    const handleWindowResize = () => {
      setWindowHeight(document.documentElement.clientHeight)
    }
    window.addEventListener('resize', handleWindowResize);
    return () => { window.removeEventListener('resize', handleWindowResize) };
  }, [windowHeight]);


  // Здесь был код модалок, см. коммит от 16.11.2023 'expand ↓↓↓'


  return (
    <>
      {/* Комменты про модалки  были здесь */}
      <div className={`custom-scroll mt-10 ${styles.section}`} ref={listRef} style={{ height: permittedHeight }}>
        {isLoading ? (
          <p className={`${styles.bund} text text_type_main-medium`}>
            Загружаем наше меню...
          </p>
        ) : (
          <>
            <h3 className={`text text_type_main-medium ${styles.heading}`}
              id="buns"
              ref={bunsRef}
            >
              Булки
            </h3>
            <ul className={styles.list}>
              {data.buns.map(el => <Card card={el} key={el._id} />)}
            </ul>

            <h3 className={`text text_type_main-medium ${styles.heading}`}
              id="sauces"
              ref={saucesRef}
            >
              Соусы
            </h3>
            <ul className={styles.list}>
              {data.sauces.map(el => <Card card={el} key={el._id} />)}
            </ul>

            <h3 className={`text text_type_main-medium ${styles.heading}`}
              id="mainFillings"
              ref={mainFillingsRef}
            >
              Начинки
            </h3>
            <ul className={styles.list}>
              {data.mainFillings.map(el => <Card card={el} key={el._id} />)}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

// реакт-обёртка для возможности проброса нескольких рефов
List = forwardRef(List);
List = memo(List);

List.propTypes = {
  props: PropTypes.object,
};

export default List;
