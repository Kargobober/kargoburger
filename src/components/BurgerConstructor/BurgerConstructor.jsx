import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './BurgerConstructor.module.css';
import { BurgerIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../Price/Price';
import Item from './Item/Item';
import { getTopCoords } from '../../utils/utils';

function BurgerConstructor({ selectedBun, selectedProducts }) {
  const [windowHeight, setWindowHeight] = useState();
  const sectionElem = useRef();
  const fillingsElem = useRef();
  const [sectionHeight, setSectionHeight] = useState(912);
  const [fillingsHeight, setFillingsHeight] = useState(560);



  useEffect(() => {
    // Получаем координаты верха секции конструктора
    const sectionTopCoord = getTopCoords(sectionElem.current);
    // Назначаем доступную высоту для секции, чтобы не появлялся скролл всего приложения
    // 40(в px) – это нижний отступ всего приложения
    setSectionHeight(document.documentElement.clientHeight - sectionTopCoord - 40);

    const fillingsTopCoord = getTopCoords(fillingsElem.current);
    // 292px - хардкод, суммарная высота элементов и отступов под списком начинок
    setFillingsHeight(document.documentElement.clientHeight - fillingsTopCoord - 292);

    return window.removeEventListener('resize', handleWindowResize);
  });

  const handleWindowResize = useCallback(() => {
    setWindowHeight(document.documentElement.clientHeight)
  }, [])



  window.addEventListener('resize', handleWindowResize);



  return (
    <section className={`${styles['section-common']} pt-25`} ref={sectionElem} style={{ maxHeight: sectionHeight }}>

      <section>

        { !selectedBun && selectedProducts.length == 0 &&
          <div style={{ display: 'flex' }}>
            <BurgerIcon type='secondary' />
            <p className='text text_type_main-default text_color_inactive'
              >&nbsp;Добавьте ингридиенты двойным кликом&nbsp;
            </p>
            <BurgerIcon type='secondary' />
          </div>
         }

        {/* верхняя булка */}
        {selectedBun && <ConstructorElement
          text={selectedBun.name}
          thumbnail={selectedBun.image}
          price={selectedBun.price}
          type="top"
          extraClass="mb-4 ml-8"
          isLocked="true"
        />}

        {/* внутренности бургера */}
        <ul className={`${styles.list} custom-scroll`} ref={fillingsElem} style={{ maxHeight: fillingsHeight }}>
          {selectedProducts.length > 0
            && selectedProducts.map((el, index) => <Item
              key={index}
              text={el.name}
              thumbnail={el.image}
              price={el.price}
            />)
          }
        </ul>

        {/* нижняя булочка */}
        {selectedBun && <ConstructorElement
        text={selectedBun.name}
        thumbnail={selectedBun.image}
        price={selectedBun.price}
        type="bottom"
        extraClass="mt-4 ml-8"
        isLocked="true"
        />}
      </section>

      <section className={styles['price-section']}>
        <Price value='610' digitsSize='medium' svgSize="32" />
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </section>

    </section>
  )
}

export default BurgerConstructor;
