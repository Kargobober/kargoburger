import React from 'react';
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './Main.module.css';

function Main({ ingridientsData }) {
  return (
    <main className={styles.main}>
      <BurgerIngridients ingridientsData={ingridientsData} />
      <BurgerConstructor ingridientsData={ingridientsData} />
    </main>
  )
}

export default Main;
