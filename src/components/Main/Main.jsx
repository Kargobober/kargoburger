import { useState } from 'react';
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './Main.module.css';

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

export default Main;
