import React, { useCallback, useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import styles from './List.module.css';
import { getTopCoords } from '../../../utils/utils';

function List({ ingridientsData, choiseCallBack }) {
  const buns = ingridientsData.filter(el => el.type === 'bun');
  const sauces = ingridientsData.filter(el => el.type === 'sauce');
  const mainFillings = ingridientsData.filter(el => el.type === 'main');

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

    return window.removeEventListener('resize', handleWindowResize);
  });

  const handleWindowResize = useCallback(() => {
    setWindowHeight(document.documentElement.clientHeight)
  }, [])



  window.addEventListener('resize', handleWindowResize);

  return (
    <div className={`custom-scroll mt-10 ${styles.section}`} ref={sectionElem} style={{ height: permittedHeight }}>
      <h3 className="text text_type_main-medium" id="buns">Булки</h3>
      <ul className={styles.list}>
        {buns.map(el => <Card card={el} key={el._id} choiseCallBack={choiseCallBack} />)}
      </ul>

      <h3 className="text text_type_main-medium" id="sauces">Соусы</h3>
      <ul className={styles.list}>
        {sauces.map(el => <Card card={el} key={el._id} choiseCallBack={choiseCallBack} />)}
      </ul>

      <h3 className="text text_type_main-medium" id="mainFillings">Начинки</h3>
      <ul className={styles.list}>
        {mainFillings.map(el => <Card card={el} key={el._id} choiseCallBack={choiseCallBack} />)}
      </ul>
    </div>
  )
}

export default List;
