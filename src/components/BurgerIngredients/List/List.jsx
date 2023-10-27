import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './List.module.css';

import { getTopCoords } from '../../../utils/utils';

import Card from '../Card/Card';
import { getCountedFiltredIngredients, getLoadingStatus } from '../../../services/selectors/ingredientsSelector';
import { ingredientsQuery } from '../../../services/middlewares/ingredientsQuery';
import { getIngredientDetailsStatus } from '../../../services/selectors/ingredientDetailsSelector';
import Modal from '../../Modal/Modal';
import IngredientDetails from '../../IngredientDetails/IngredientDetails';
import { clearInfo } from '../../../services/slices/ingredientDetailsSlice';


function List() {
  const dispatch = useDispatch();

  const isLoading = useSelector(getLoadingStatus);
  useEffect(() => {
    dispatch(ingredientsQuery());
  }, [dispatch]);
  // Получаем обработанные данные из хранилища, сам результат обработки в хранилище не хранится. Не знаю, верно ли это
  const data = useSelector(getCountedFiltredIngredients);

  const sectionElem = useRef();
  // При текущей системе оступов (единица = 4px) подходящая высота секции около 616px (через девтулзы можно обнаружить высоту на которой появляется скролл)
  // Автоматический расчет доступной высоту выдаёт 616,406. Так что всё чётко - как в больнице :)
  const [permittedHeight, setPermittedHeight] = useState(616);
  const [windowHeight, setWindowHeight] = useState();
  useEffect(() => {
    // Получаем координаты верха секции с карточками
    const sectionTopCoord = getTopCoords(sectionElem.current);
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

  const isOpen = useSelector(getIngredientDetailsStatus);
  const onClose = () => {
    dispatch(clearInfo());
  }
  const modal = (
    <Modal
      heading='Детали ингридиента'
      isOpen={isOpen}
      onClose={onClose}
    >
      <IngredientDetails />
    </Modal>
  )

  return (
    <>
      {/* Комментарий был написан мною, когда модалка была в файле card.js (до коммита "feat: add deleting goods" включительно):

      положение строки ниже важно. Когда она была внутри li, то модалка не закрывалась, т.к. реакт видимо???? не перерисовывал li из-за неизмененных пропсов в наружнем уровне (в самом li). Хотя если разместить консоль-лог, то пишет, что заходит внутрь пункта списка. А вот needDetails старое значение выводил (true), потому модалка оставалась открытой... Непонятно */}
      {/* В данном случае положение блока кода с условным рендерингом может быть и внутри дива, написанного в коде непосредственно ниже */}
      {/* Я перенес модалку сюда, т.к. при предыдущем расположеннии модалки нажатие на esc вызывало 15 экшенов (т.к. 15 карточек) на очищение стэйта ингридиента, предназначенного для вывода в модалку. Нажатие на крестик или оверлэй вызывало лишь один экшн. */}
      { isOpen && modal }
      <div className={`custom-scroll mt-10 ${styles.section}`} ref={sectionElem} style={{ height: permittedHeight }}>
        {isLoading ? (
          <p className={`${styles.bund} text text_type_main-medium`}>
            Загружаем наше меню...
          </p>
        ) : (
        <>
          <h3 className={`text text_type_main-medium ${styles.heading}`} id="buns">Булки</h3>
          <ul className={styles.list}>
            {data.buns.map(el => <Card card={el} key={el._id} />)}
          </ul>

          <h3 className={`text text_type_main-medium ${styles.heading}`} id="sauces">Соусы</h3>
          <ul className={styles.list}>
            {data.sauces.map(el => <Card card={el} key={el._id} />)}
          </ul>

          <h3 className={`text text_type_main-medium ${styles.heading}`} id="mainFillings">Начинки</h3>
          <ul className={styles.list}>
            {data.mainFillings.map(el => <Card card={el} key={el._id} />)}
          </ul>
        </>
        )}
      </div>
    </>
  )
}

export default List;
