import styles from './IngredientDetails.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { getIngredientDetails } from '../../services/selectors/ingredientDetailsSelector';
import { useParams } from 'react-router';
import { findIngredientObj } from '../../utils/utils';
import { getIngredients } from '../../services/selectors/ingredientsSelector';
import { setInfo } from '../../services/slices/ingredientDetailsSlice';
import { useEffect } from 'react';
import useWindowSize from '../../utils/hooks/useWindowSize';

function IngredientDetails(): JSX.Element {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const textClassForHeading = windowSize.width > 500 ? 'text_type_main-medium' : 'text_type_main-small-extra';
  const sizeForNames = windowSize.width > 500 ? 'text_type_main-default' : 'text_type_main-small';
  const sizeForDigits = windowSize.width > 500 ? 'text_type_digits-default' : 'text_type_digits-small';

  // часть адресной строки, динамическая
  const { id } = useParams();

  // все ингредиенты, с сервера
  const ingredientsData = useSelector(getIngredients);

  // ↓ ингредиент для модалки, из хранилища, раздел ingredientDetails
  const ingredient = useSelector(getIngredientDetails);
  const { image_large, name, calories, proteins, fat, carbohydrates, image } = ingredient;


  useEffect(() => {
    if(id && ingredientsData) {
      // исп-ую написанную ранее функцию
      const foundIngredient = findIngredientObj(id, ingredientsData);
      // сохраняю ингредиент для модалки в раздел хранилища ingredientDetails
      if (foundIngredient) dispatch(setInfo(foundIngredient));
    }
  }, [ingredientsData]); // именно такая зависимость позволит перезагружать страницу и не терять модалку

  return (
    <div className={styles.container}>
      <img src={image_large || image} alt={name} className={styles.image} />

      <h3
        className={`text ${textClassForHeading} text_centered ${styles.heading}`}
      >
        {name}
      </h3>

      <ul className={styles.list}>
        <li className={styles.item}>
          <h4 className={`text ${sizeForNames} text_color_inactive`}>Калории, ккал</h4>
          <p className={`text ${sizeForDigits} text_color_inactive`}>{calories}</p>
        </li>

        <li className={styles.item}>
          <h4 className={`text ${sizeForNames} text_color_inactive`}>Белки, г</h4>
          <p className={`text ${sizeForDigits} text_color_inactive`}>{proteins}</p>
        </li>

        <li className={styles.item}>
          <h4 className={`text ${sizeForNames} text_color_inactive`}>Жиры, г</h4>
          <p className={`text ${sizeForDigits} text_color_inactive`}>{fat}</p>
        </li>

        <li className={styles.item}>
          <h4 className={`text ${sizeForNames} text_color_inactive`}>Углеводы, г</h4>
          <p className={`text ${sizeForDigits} text_color_inactive`}>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;
