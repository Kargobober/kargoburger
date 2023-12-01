import { FC, useRef, useState, useEffect } from 'react';
import styles from './feed.module.css';
import Order from '../components/Order/Order';
import { getTopCoords } from '../utils/utils';
import { StatusKind, TResponseGetOrder } from '../utils/api/types';

const FeedPage: FC = () => {
  const testData = {
    success: true,

    orders: [
      /*{
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0949",
          "643d69a5c3f7b9001cfa094a",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "114",
        status: "done",
        number: 1000,
        createdAt: "2007-06-23T10:10:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0949",
          "643d69a5c3f7b9001cfa094a",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "114",
        status: "done",
        number: 1000,
        createdAt: "2007-06-23T10:10:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0949",
          "643d69a5c3f7b9001cfa094a",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "114",
        status: "done",
        number: 1000,
        createdAt: "2007-06-23T10:10:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0949",
          "643d69a5c3f7b9001cfa094a",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "114",
        status: "done",
        number: 1000,
        createdAt: "2007-06-23T10:10:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },*/
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0949",
          "643d69a5c3f7b9001cfa094a",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "114",
        status: "done",
        number: 25567,
        createdAt: "2007-06-23T10:10:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0949",
          "643d69a5c3f7b9001cfa094a",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "114",
        status: "done",
        number: 25565,
        createdAt: "2007-06-23T10:10:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "11",
        status: "done",
        number: 1111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Spicy mega-bruch',
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0948",
        ],
        _id: "22",
        status: "pending",
        number: 2222,
        createdAt: "2023-11-26T04:44:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'Tracy 012345678910',
      },
      {
        ingredients: [
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b7",
        ],
        _id: "33",
        status: "done",
        number: 3333,
        createdAt: "2023-11-25T10:00:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
        name: 'spicy',
      },
    ],

    total: 26510,
    totalToday: 124,
  } as unknown as TResponseGetOrder;
  // логика доступной высота, для скролла
  const listRef = useRef<HTMLOListElement>(null);
  const [permittedHeight, setPermittedHeight] = useState(744);
  const [windowHeight, setWindowHeight] = useState<number>();
  useEffect(() => {
    if (listRef.current) {
      const sectionTopCoord = getTopCoords(listRef.current);
      setPermittedHeight(document.documentElement.clientHeight - sectionTopCoord);

      const handleWindowResize = () => {
        setWindowHeight(document.documentElement.clientHeight)
      }
      window.addEventListener('resize', handleWindowResize);
      return () => { window.removeEventListener('resize', handleWindowResize) };
    }
  }, [windowHeight]);

  const { orders, total, totalToday } = testData;
  const completedOrders = orders.filter(el => el.status === StatusKind.DONE);
  const pendingdOrders = orders.filter(el => el.status === StatusKind.PENDING);

  return (
    <main className={`${styles.main} pl-5 pr-5`}>

      <h2 className={`text text_type_main-large pt-10 pb-5 ${styles.mainHeading}`}>Лента заказов</h2>

      <section>
        {/* h3 фикция - Список заказов */}
        <ol className={styles.ordersList + ` listGlobal custom-scroll pt-1 pb-3`} ref={listRef} style={{ height: permittedHeight }}>
          {/* h4 - заголовок каждого заказа */}
          {testData.orders.map((el, i) => {
            return (
              <Order ingredients={el.ingredients}
                _id={el._id}
                number={el.number}
                createdAt={el.createdAt}
                name={el.name}
                key={i}
                status={el.status!}
                usageCase='feed'
              />
            )
          })}
        </ol>
      </section>

      <section className={styles.digits}>
        {/* h3 фикция - Заказы в числах */}

        <section className={styles.mainDigits}>
          {/* h4 фикция - важная информация, списки готовых заказов и заказов в работе */}

          <section className={styles.completedOrders}>
            {/* h5 - готовы */}
            <h5 className='text text_type_main-medium mb-6'>Готовы:</h5>
            <ol className={`${styles.listDone} listGlobal custom-scroll`}>
              {completedOrders.map((el, i) => (
                <li className={`text text_type_digits-default text_color_success ${styles.item}`} key={i}>
                  {el.number}
                </li>
              ))}
            </ol>
          </section>
          <section className={styles.pendingOrders}>
            {/* h5 - в работе */}
            <h5 className='text text_type_main-medium  mb-6'>В работе:</h5>
            <ol className={`listGlobal ${styles.listPending} custom-scroll`}>
              {pendingdOrders.map((el, i) => (
                <li className='text text_type_digits-default' key={i}>
                  {el.number}
                </li>
              ))}
            </ol>
          </section>

        </section>

        <aside className={styles.asideDigits}>
          {/* h4 фикция - доп. информация */}

          <section>
            {/* h5 - выполнены за всё время */}
            <h5 className='text text_type_main-medium'>Выполнены за всё время:</h5>
            <p className={`text text_type_digits-large text_decor_shadow`}>{total}</p>
          </section>
          <section>
            {/* h5 - выполнены за сегодня */}
            <h5 className='text text_type_main-medium'>Выполнены за сегодня:</h5>
            <p className={`text text_type_digits-large text_decor_shadow`}>{totalToday}</p>
          </section>

        </aside>

      </section>

    </main>
  )
};

export default FeedPage;
