import React from 'react';

import styles from './BurgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import List from './List/List';


function BurgerIngredients() {
  const [current, setCurrent] = React.useState('Булки');

  return (
    <section className={`${styles.section} pt-10`}>
      <h2 className={`${styles.header} text_type_main-large`}>Соберите бургер</h2>
      <nav>
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
      <List />
    </section>
  )
}

export default BurgerIngredients;
