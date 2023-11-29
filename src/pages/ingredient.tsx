import { useEffect, useState } from 'react';
import { useSelector } from '../services/hooks';
import { useParams } from 'react-router';
import { getIngredients } from '../services/selectors/ingredientsSelector';
import { findIngredientObj } from '../utils/utils';
import styles from './ingredient.module.css';
import stylesGlobal from '../index.css';
import { TIngredientExtraId } from '../utils/types';

const IngredientPage = () => {
  const { id } = useParams();

  const ingredientsData = useSelector(getIngredients);
  const [ingredient, setIngredient] = useState<TIngredientExtraId | null>(null);

  useEffect(() => {
    if (ingredientsData.length && id) setIngredient(findIngredientObj(id, ingredientsData));
  }, [id, ingredientsData]);

  if (!ingredient) return null;

  const { image_large, name, calories, proteins, fat, carbohydrates, image } = ingredient;

  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-large mt-30'>Детали ингредиента</h1>

      <img src={image_large || image} alt={name} className={styles.image} />

      <h2
        className={`
            text text_type_main-medium
            ${stylesGlobal['text_centered']}
          `}
      >{name}</h2>

      <ul className={styles.list}>
        <li className={styles.item}>
          <h3 className='text text_type_main-default text_color_inactive'>Каллории, ккал</h3>
          <p className='text text_type_digits-default text_color_inactive'>{calories}</p>
        </li>

        <li className={styles.item}>
          <h3 className='text text_type_main-default text_color_inactive'>Белки, г</h3>
          <p className='text text_type_digits-default text_color_inactive'>{proteins}</p>
        </li>

        <li className={styles.item}>
          <h3 className='text text_type_main-default text_color_inactive'>Жиры, г</h3>
          <p className='text text_type_digits-default text_color_inactive'>{fat}</p>
        </li>

        <li className={styles.item}>
          <h3 className='text text_type_main-default text_color_inactive'>Углеводы, г</h3>
          <p className='text text_type_digits-default text_color_inactive'>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default IngredientPage;
