import { useEffect, useState } from 'react';
import { useSelector } from '../services/hooks';
import { useParams } from 'react-router';
import { getIngredients } from '../services/selectors/ingredientsSelector';
import { findIngredientObj } from '../utils/utils';
import styles from './ingredient.module.css';
import stylesGlobal from '../index.css';
import { TIngredientExtraId } from '../utils/types';
import useWindowSize from '../utils/hooks/useWindowSize';

const IngredientPage = () => {
  const { id } = useParams();
  const windowSize = useWindowSize();

  const marginTopForHeading = windowSize.width > 800 ? 'mt-30' : 'mt-3';
  const textClassForHeading = windowSize.width > 800 ? 'text_type_main-large' : 'text_type_main-medium-extra';
  const sizeForNames = windowSize.width > 500 ? 'text_type_main-default' : 'text_type_main-small';
  const sizeForDigits = windowSize.width > 500 ? 'text_type_digits-default' : 'text_type_digits-small';

  const ingredientsData = useSelector(getIngredients);
  const [ingredient, setIngredient] = useState<TIngredientExtraId | null>(null);

  useEffect(() => {
    if (ingredientsData.length && id) setIngredient(findIngredientObj(id, ingredientsData));
  }, [id, ingredientsData]);

  if (!ingredient) return null;

  const { image_large, name, calories, proteins, fat, carbohydrates, image } = ingredient;

  return (
    <main className={`${styles.container} pl-2 pr-2`}>
      <h1 className={`text ${textClassForHeading} ${marginTopForHeading}`}>Детали ингредиента</h1>

      <img src={image_large || image} alt={name} className={styles.image} />

      <h2 className={`text text_type_main-medium text_centered`}>
        {name}
      </h2>

      <ul className={styles.list}>
        <li className={styles.item}>
           <h3 className={`text ${sizeForNames} text_color_inactive text_centered`}>Калории, ккал</h3>
          <p className={`text ${sizeForDigits} text_color_inactive text_centered`}>{calories}</p>
        </li>

        <li className={styles.item}>
          <h3 className={`text ${sizeForNames} text_color_inactive text_centered`}>Белки, г</h3>
          <p className={`text ${sizeForDigits} text_color_inactive text_centered`}>{proteins}</p>
        </li>

        <li className={styles.item}>
          <h3 className={`text ${sizeForNames} text_color_inactive text_centered`}>Жиры, г</h3>
          <p className={`text ${sizeForDigits} text_color_inactive text_centered`}>{fat}</p>
        </li>

        <li className={styles.item}>
          <h3 className={`text ${sizeForNames} text_color_inactive text_centered`}>Углеводы, г</h3>
          <p className={`text ${sizeForDigits} text_color_inactive text_centered`}>{carbohydrates}</p>
        </li>
      </ul>
    </main>
  )
}

export default IngredientPage;
