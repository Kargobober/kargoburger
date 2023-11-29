// КОНТЕНТ МОДАЛКИ О ДЕТАЛЯХ ЗАКАЗА

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

type TData = {
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
    <section>
      <p>#{number}</p>

      <h2>{name}</h2>
      <p>{statusRus}</p>

      <h3>Состав:</h3>
      <ol>
        {ingredients.map(el => (<Item
            image={el.image}
            image_mobile={el.image_mobile}
            name={el.name}
            qty={el.qty}
            price={el.price}
          />
        ))}
      </ol>
      <div>
        <FormattedDate date={new Date(time)}/>
        <Price value={price} digitsSize='medium'/>
      </div>
    </section>
  )
};

export default OrderInfo;
