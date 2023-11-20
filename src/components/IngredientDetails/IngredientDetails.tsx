import styles from './IngredientDetails.module.css';
import stylesGlobal from '../../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientDetails } from '../../services/selectors/ingredientDetailsSelector';
import { useParams } from 'react-router';
import { findIngredientObj } from '../../utils/utils';
import { getIngredients } from '../../services/selectors/ingredientsSelector';
import { setInfo } from '../../services/slices/ingredientDetailsSlice';
import { useEffect } from 'react';

function IngredientDetails() {
  const dispatch = useDispatch();

  // часть адресной строки, динамическая
  const { id } = useParams();

  // все ингредиенты, с сервера
  const ingredientsData = useSelector(getIngredients);

  // ↓ ингредиент для модалки, из хранилища, раздел ingredientDetails
  const ingredient = useSelector(getIngredientDetails);
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;


  useEffect(() => {
    // исп-ую написанную ранее функцию
    const foundIngredient = findIngredientObj(id, ingredientsData);
    // сохраняю ингредиент для модалки в раздел хранилища ingredientDetails
    dispatch(setInfo(foundIngredient));
    // именно такая зависимость позволит перезагружать страницу и не терять модалку
  }, [ingredientsData]);

  return (
    <div className={styles.container}>
      <img src={image_large} alt={name} className={styles.image} />

      <h3
        className={`
          text text_type_main-medium
          ${stylesGlobal['text_centered']}
        `}
      >{name}</h3>

      <ul className={styles.list}>
        <li className={styles.item}>
          <h4 className='text text_type_main-default text_color_inactive'>Каллории, ккал</h4>
          <p className='text text_type_digits-default text_color_inactive'>{calories}</p>
        </li>

        <li className={styles.item}>
          <h4 className='text text_type_main-default text_color_inactive'>Белки, г</h4>
          <p className='text text_type_digits-default text_color_inactive'>{proteins}</p>
        </li>

        <li className={styles.item}>
          <h4 className='text text_type_main-default text_color_inactive'>Жиры, г</h4>
          <p className='text text_type_digits-default text_color_inactive'>{fat}</p>
        </li>

        <li className={styles.item}>
          <h4 className='text text_type_main-default text_color_inactive'>Углеводы, г</h4>
          <p className='text text_type_digits-default text_color_inactive'>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;
