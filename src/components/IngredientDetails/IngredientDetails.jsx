import styles from './IngridientDetails.module.css';
import stylesGlobal from '../../index.css';
import { ingredientPropType } from '../../utils/prop-types';

function IngridientDetails({ ingridient }) {
  const { image, name, calories, proteins, fat, carbohydrates } = ingridient;

  return (
    <div className={styles.container}>
      <img src={image} alt={name} className={styles.image} />

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

IngridientDetails.propTypes = {
  ingridient: ingredientPropType,
}

export default IngridientDetails;
