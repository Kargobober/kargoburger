import { useEffect, useRef, useState, forwardRef, useImperativeHandle, memo, FC } from 'react';
import { useSelector } from '../../../services/hooks';

import styles from './List.module.css';

import { getTopCoords, handleError } from '../../../utils/utils';

import Card from '../Card/Card';
import { getCountedFiltredIngredients, getErrorStatus, getLoadingStatus } from '../../../services/selectors/ingredientsSelector';
import { TSuperRef } from '../../../utils/types';
import useWindowSize from '../../../utils/hooks/useWindowSize';

// первый параметр нельзя удалить. Второй параметр появляется из-за дальнейшей обёртки в forwardRef
const List = forwardRef((props, ref: React.ForwardedRef<TSuperRef>) => {
  const windowSize = useWindowSize();
  const classTypographyForHeader = windowSize.width < 501 ? 'text_type_main-small-extra' : 'text_type_main-medium';

  const listRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);
  const mainFillingsRef = useRef<HTMLHeadingElement>(null);
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

  // Получаем обработанные данные из хранилища, сам результат обработки в хранилище не хранится. Не знаю, верно ли это
  const data = useSelector(getCountedFiltredIngredients);

  // Здесь был код модалок, см. коммит от 16.11.2023 'expand ↓↓↓'



  return (
    <>
      {/* Комменты про модалки  были здесь */}
      <div className={`custom-scroll ${windowSize.width > 500 ? 'mt-10' : 'mt-5'} ${styles.section}`} ref={listRef}>
        {isLoading ? (
          <p className={`${styles.bund} text text_type_main-medium`}>
            Загружаем наше меню...
          </p>
        ) : (
          <>
            <h3 className={`text ${classTypographyForHeader} ${styles.heading}`}
              id="buns"
              ref={bunsRef}
            >
              Булки
            </h3>
            <ul className={styles.listOfIngrInCategory}>
              {data.buns.map(el => <Card card={el} key={el._id} />)}
            </ul>

            <h3 className={`text ${classTypographyForHeader} ${styles.heading}`}
              id="sauces"
              ref={saucesRef}
            >
              Соусы
            </h3>
            <ul className={styles.listOfIngrInCategory}>
              {data.sauces.map(el => <Card card={el} key={el._id} />)}
            </ul>

            <h3 className={`text ${classTypographyForHeader} ${styles.heading}`}
              id="mainFillings"
              ref={mainFillingsRef}
            >
              Начинки
            </h3>
            <ul className={styles.listOfIngrInCategory}>
              {data.mainFillings.map(el => <Card card={el} key={el._id} />)}
            </ul>
          </>
        )}
      </div>
    </>
  )
});

export default memo(List);
