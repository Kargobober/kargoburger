import { useState } from 'react';

import styles from './Main.module.css';

import BurgerIngridients from '../BurgerIngridients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function Main() {
  // Если в начальный стейт записать пустой объект, то проверка на типы выдает ошибку несоответствия, потому записываю null. Более того - рисуются пустые ячейки с белыми прямоугольниками вместо картинок
  const [selectedBun, setSelectedBun] = useState(null);
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
      <BurgerIngridients choiseCallBack={handleChoice} />
      <BurgerConstructor selectedBun={selectedBun} selectedProducts={selectedProducts} />
    </main>
  )
}

export default Main;
