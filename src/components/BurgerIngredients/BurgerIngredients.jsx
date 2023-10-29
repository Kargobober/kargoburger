import { useState, useRef, useEffect} from 'react';

import styles from './BurgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import List from './List/List';


function BurgerIngredients() {
  const [current, setCurrent] = useState('Булки');
  const navElem = useRef(null);
  const fourfoldRef = useRef(null);



  useEffect(() => {
    const navElemCoord = navElem.current.getBoundingClientRect();
    const handleScroll = event => {
      const arrOfElem = [fourfoldRef.current.buns, fourfoldRef.current.sauces, fourfoldRef.current.mainFillings];
      const arrOfObj = arrOfElem.map(el => ({
        elem: el,
        delta: Math.abs(el.getBoundingClientRect().top - navElemCoord.bottom),
      }));
      const closestObj = arrOfObj.reduce((prev, curr) => prev.delta < curr.delta ? prev : curr);
      setCurrent(closestObj.elem.textContent);
    };

    fourfoldRef.current.list.addEventListener('scroll', handleScroll);
    return () => {
    fourfoldRef.current.list.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <section className={`${styles.section} pt-10`}>
      <h2 className={`${styles.header} text_type_main-large`}>Соберите бургер</h2>
      <nav ref={navElem}>
        <ul className={styles.list}>
          <li>
            <a href="#buns" className={styles.link}>
              <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
                Булки
              </Tab>
            </a>
          </li>
          <li>
            <a href="#sauces" className={styles.link}>
              <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
                Соусы
              </Tab>
            </a>
          </li>
          <li>
            <a href="#mainFillings" className={styles.link}>
              <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
                Начинки
              </Tab>
            </a>
          </li>
        </ul>
      </nav>
      <List ref={fourfoldRef} />
    </section>
  )
}

export default BurgerIngredients;
