import { useState } from 'react';

import styles from './Main.module.css';

import BurgerIngridients from '../BurgerIngridients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function Main() {
  return (
    <main className={styles.main}>
      <BurgerIngridients />
      <BurgerConstructor />
    </main>
  )
}

export default Main;
