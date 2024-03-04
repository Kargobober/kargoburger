import styles from './ProductList.module.css';
import { useSelector } from '../../../../services/hooks';
import { getSelectedBun, getSelectedProducts } from '../../../../services/selectors/burgerConstructorSelector';
import ProductItem from './ProductItem/ProductItem';
import useWindowSize from '../../../../utils/hooks/useWindowSize';

function ProductList() {
  const windowSize = useWindowSize();

  const selectedBun = useSelector(getSelectedBun);
  const selectedProducts = useSelector(getSelectedProducts);

  return (
    <ul className={`${styles.listOfProduct} listGlobal ${windowSize.width < 501 ? 'custom-scroll_nullish' : 'custom-scroll'}`}>
      {selectedBun ? (
        <ProductItem
          item={selectedBun}
          windowSize={windowSize}
        />
      ) : (
        <li>Добавьте булку</li>
      )}

      {selectedProducts.map((product, index) => (
        <ProductItem
          key={product.extraId}
          item={product}
          index={index}
          windowSize={windowSize}
        />
      ))}

      {selectedBun ? (
        <ProductItem
          item={selectedBun}
          windowSize={windowSize}
        />
      ) : (
        <li>Хлеб всему квазар</li>
      )}
    </ul>
  )
}

export default ProductList;
