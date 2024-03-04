// КОНТЕНТ МОДАЛКИ О ДЕТАЛЯХ ЗАКАЗА сделанном когда угодно

import { FC, useEffect, useState } from 'react';
import styles from './OrderInfo.module.css';
import Item from './Item/Item';
import { useLocation } from 'react-router';
import { TIngredientExtraId, TIngredientExtraIdCounted } from '../../utils/types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../Price/Price';
import { countIngredient, findIngredientObj } from '../../utils/utils';
import { useSelector } from '../../services/hooks';
import { getIngredients, getLoadingStatus } from '../../services/selectors/ingredientsSelector';

export type TData = {
  number: number;
  name: string;
  statusRus: string;
  idArr: string[];
  time: string;
  price: number;
};

const OrderInfo: FC = () => {
  const {state} = useLocation();
  const { number, name, statusRus, idArr, time, price }: TData = state.data;

  const ingredientsFromServer = useSelector(getIngredients);
  const isLoading = useSelector(getLoadingStatus);

  const quantityOfEachIngredient = countIngredient(idArr);
  const [ingredients, setIngredients] = useState<TIngredientExtraIdCounted[]>([]);

  useEffect(() => {
    if (isLoading === false && ingredientsFromServer.length) {
      const ingredients: TIngredientExtraIdCounted[] = [];
      for (let id in quantityOfEachIngredient) {
        // ингредиент точно найдутся, т.к. в Order.tsx вызвать модалку можно только для заказов, у которых найдены все ингредиенты
        const foundedObj = findIngredientObj(id, ingredientsFromServer) as TIngredientExtraId;
        ingredients.push({ ...foundedObj, qty: quantityOfEachIngredient[id] });
      }
      setIngredients(ingredients);
    }
  }, [isLoading, ingredientsFromServer])

  return (
    <section className={styles.section}>
      <h2 className={`text text_type_main-medium mb-2 mt-5`}>{name}</h2>
      <p className={`text text_type_main-default ${statusRus === 'Выполнен' ? styles.success : ''}`}>{statusRus}</p>

      <h3 className='text text_type_main-medium mt-15 mb-6'>Состав:</h3>
      <ol className={`mb-10 ${styles.list} listGlobal custom-scroll`}>
        {ingredients.map((el, i) => (<Item
            image={el.image}
            image_mobile={el.image_mobile}
            name={el.name}
            qty={el.qty}
            price={el.price}
            key={i}
          />
        ))}
      </ol>
      <div className={styles.footer}>
        <FormattedDate date={new Date(time)} className='text text_type_main-default text_color_inactive' />
        <Price value={price} digitsSize='default' />
      </div>
    </section>
  )
};

export default OrderInfo;
