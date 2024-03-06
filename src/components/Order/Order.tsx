import { FC, useEffect, useState } from 'react';
import Price from '../Price/Price';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { findIngredientObj, translateOrderStatus } from '../../utils/utils';
import { useSelector } from '../../services/hooks';
import { getIngredients, getLoadingStatus } from '../../services/selectors/ingredientsSelector';
import { TIngredientExtraId } from '../../utils/types';
import styles from './Order.module.css';
import { Link, useLocation } from 'react-router-dom';
import { StatusKind } from '../../utils/api/types';
import useWindowSize from '../../utils/hooks/useWindowSize';

type TOrderProps = {
  ingredients: string[];
  _id: string;
  number: number;
  createdAt: string;
  name: string;
  status: StatusKind;
  usageCase: 'feed' | 'profile/orders';
};



const Order: FC<TOrderProps> = ({ ingredients, _id, number, createdAt, name, status, usageCase }) => {
  const location = useLocation();
  const windowSize = useWindowSize();

  const classTextDigits = windowSize.width > 600 ? 'text_type_digits-default' : 'text_type_digits-small';
  const classText = windowSize.width > 600 ? 'text_type_main-default' : 'text_type_main-small';
  const classTextHeading = windowSize.width > 600 ? 'text_type_main-medium' : 'text_type_main-small-extra';

  let marginForHeading = '';
  if (usageCase === 'profile/orders') {
    windowSize.width > 600 ? marginForHeading = 'mt-6 mb-2' : marginForHeading = 'mt-4 mb-2';
  } else { // usageCase === 'feed'
    windowSize.width > 600 ? marginForHeading = 'mt-6 mb-6' : marginForHeading = 'mt-4 mb-4';
  }

  const marginForOrderStatus = windowSize.width > 600 ? 'mb-6' : 'mb-4';

  const formattedDate = String(FormattedDate({date: new Date(createdAt)})?.props.children);
  const [dateDay, dateTime] = formattedDate.split(',').filter(el => el !== ' ');

  const ingredientsFromServer = useSelector(getIngredients);
  const isLoading = useSelector(getLoadingStatus);

  // переназову переменную с массивом айдишек ингредиентов из заказа
  const idArr = ingredients;

  // стейт объектов ингредиентов
  const [ingredientsArr, setIngredientsArr] = useState<(TIngredientExtraId | null)[]>([]);
  const [isNull, setIsNull] = useState(false);



  useEffect(() => {
    if (isLoading === false && ingredientsFromServer.length) {
      // создаем массив ингредиентов из айдишек
      const ingredientsArrNew = idArr.map(id => findIngredientObj(id, ingredientsFromServer));
      // когда массив объектов полностью создан, проверяем его членов на нулёвость
      if (ingredientsArrNew.some(el => el === null)) {
        setIsNull(true);
      } else {
        // и только послё всего этого меняем стейт (минимизируем ререндеры)
        setIngredientsArr(ingredientsArrNew);
        setIsNull(false);
      }
    };
  }, [ingredientsFromServer, isLoading]);

  const statusRus = translateOrderStatus(status);

  const price = ingredientsArr.reduce((acc, el) => acc + el!.price, 0);

  return (
    <li className={`${styles.item} ${isNull ? styles.nullish : ''} `}>
      <Link
        to={isNull ? 'https://yandex.ru/support/market/return/terms.html#return__money'
          : `${number}`}
        state = {{
          background: location,
          data: {
            number,
            name,
            statusRus,
            idArr,
            time: createdAt,
            price
          }
        }}
        className={`linkGlobal ${styles.link}`}
        target={!isNull ? '' : '_blank'}
        rel={!isNull ? '' : "noopener noreferrer"}
      >

        {isNull && (
          <>
            <div className={styles.hat}>
              <span className={`text ${classTextDigits}`}>#{number}</span>
              <FormattedDate date={new Date(createdAt)} className={`text ${classText} text_color_inactive ${styles.date}`} />
            </div>
            <h4 className={`text ${classText} ${styles.errorHeading}`}>
              {`Ошибка получения заказа!
            Пожалуйста, перезагрузите страницу👾`}
            </h4>
          </>
        )}


        {!isNull && (
          <>
            <div className={styles.hat}>
              <span className={`text ${classTextDigits}`}>#{number}</span>
              <div className={`text ${classText} text_color_inactive ${styles.date}`}>
                <p>{dateDay},</p>
                <p>{dateTime}</p>
              </div>
            </div>

            <div>
              <h4 className={`text ${classTextHeading} ${marginForHeading}`}>{name}</h4>
              {usageCase !== 'feed' && (
                <p className={`text ${classText} ${marginForOrderStatus} ${status === StatusKind.DONE ? styles.success : ''}`}>
                  {statusRus}
                </p>
              )}
            </div>

            <div className={styles.footer}>
              <ul className={styles.imagesList + ` listGlobal`}>
                {ingredientsArr.map((el, i, arr) => {
                  if (i < 5) {
                    return (
                      // TODO: в глобальных стилях прописать
                      <li className={`little-item-${i} ${styles.circle}`} key={i}>
                        <img src={el?.image_mobile ? el.image_mobile : el!.image}
                          alt={el!.name}
                          className={styles.image}
                        ></img>
                      </li>
                    )
                  } else {
                    if (i === 5) return (
                      <li className={`little-item-${i} ${styles.circle}`} key={i}>
                        <img src={el?.image_mobile ? el.image_mobile : el!.image}
                          alt={el!.name}
                          className={styles.image}
                        />
                        {<span className={`text ${classText} ${arr.length - i === 1 ? '' : styles.counter}`}>+{arr.length - i}</span>}
                      </li>
                    );

                    return null; // для дальнейших ингредиентов выводим священное НИЧЕГО
                  }
                })}
              </ul>
              <Price value={price} digitsSize={windowSize.width > 600 ? 'default' : 'small'} />
            </div>
          </>
        )}
      </Link>
    </li>
  )
};

export default Order;
