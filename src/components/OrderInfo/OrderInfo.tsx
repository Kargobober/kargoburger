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
import useWindowSize from '../../utils/hooks/useWindowSize';

export type TData = {
  number: number;
  name: string;
  statusRus: string;
  idArr: string[];
  time: string;
  price: number;
};

const OrderInfo: FC = () => {
  const windowSize = useWindowSize();
  const {state} = useLocation();
  const { name, statusRus, idArr, time, price }: TData = state.data;

  const classTextHeading = windowSize.width > 850 ? 'text_type_main-medium' : 'text_type_main-small-extra';
  const classText = windowSize.width > 850 ? 'text_type_main-default' : 'text_type_main-small';

  const marginForHeading = windowSize.width > 850 ? 'mt-6 mb-2' : 'mt-6 mb-2';
  const marginForCompound = windowSize.width > 850 ? 'mt-15 mb-6' : 'mt-6 mb-4';
  const marginForFooter = windowSize.width > 850 ? 'mt-15' : '';

  const paddingForContent = windowSize.width > 850 ? 'pl-10 pr-10' : 'pl-2 pr-2';
  const paddingForFooter = windowSize.width > 850 ? 'pl-10 pr-10 pb-10' : 'pt-2 pr-2 pb-2 pl-2';

  const scrollStyle = windowSize.width > 500 ? 'custom-scroll' : 'custom-scroll_nullish';

  const ingredientsFromServer = useSelector(getIngredients);
  const isLoading = useSelector(getLoadingStatus);

  const quantityOfEachIngredient = countIngredient(idArr);
  const [ingredients, setIngredients] = useState<TIngredientExtraIdCounted[]>([]);

  useEffect(() => {
    if (isLoading === false && ingredientsFromServer.length) {
      const ingredients: TIngredientExtraIdCounted[] = [];
      for (let id in quantityOfEachIngredient) {
        // ингредиенты точно найдутся, т.к. в Order.tsx вызвать модалку можно только для заказов, у которых найдены все ингредиенты
        const foundedObj = findIngredientObj(id, ingredientsFromServer) as TIngredientExtraId;
        ingredients.push({ ...foundedObj, qty: quantityOfEachIngredient[id] });
      }
      setIngredients(ingredients);
    }
  }, [isLoading, ingredientsFromServer])

  return (
    <section className={styles.section}>
      <div className={`${styles.mainContent} ${paddingForContent}`}>
        <h2 className={`text ${classTextHeading} ${marginForHeading} ${styles.name} ${scrollStyle}`}>{name}</h2>
        <p
          className={`text ${classText} ${statusRus === 'Выполнен' ? styles.success : ''}`}
        >
          {statusRus}
        </p>

        <h3 className={`text ${classTextHeading} ${marginForCompound}`}>Состав:</h3>
        <ol className={`${styles.list} listGlobal ${scrollStyle}`}>
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
      </div>
      <div className={`${styles.footer} ${marginForFooter} ${paddingForFooter}`}>
        <FormattedDate date={new Date(time)} className={`text ${classText} text_color_inactive`} />
        <Price value={price} digitsSize={windowSize.width > 850 ? 'default' : 'small'} />
      </div>
    </section>
  )
};

export default OrderInfo;
