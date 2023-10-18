import { useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

import styles from './Main.module.css';

import BurgerIngridients from '../BurgerIngridients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function Main({ ingridientsData }) {
  const [selectedBun, setSelectedBun] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleChoice = (product) => {
    switch(product.type) {
      case 'bun':
        setSelectedBun(product);
        break;
      case 'sauce':
      case 'main':
        setSelectedProducts([ ...selectedProducts, product]);
        break;
    }
  }

  return (
    <main className={styles.main}>
      <BurgerIngridients ingridientsData={ingridientsData} choiseCallBack={handleChoice} />
      <BurgerConstructor selectedBun={selectedBun} selectedProducts={selectedProducts} />
    </main>
  )
}

Main.propTypes = {
  ingridientsData: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}

export default Main;
