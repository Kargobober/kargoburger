import { useState, useRef, useEffect } from 'react';
import Order from '../../Order/Order';
import styles from './Orders.module.css';
import { getTopCoords } from '../../../utils/utils';
import { Outlet } from 'react-router';

const testData = {
  success: true,

  orders: [
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
};

const Orders = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const [permittedHeight, setPermittedHeight] = useState(812);
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


  return (
    <>
      <ol className={styles.ordersList + ` listGlobal custom-scroll pt-1`} ref={listRef} style={{ height: permittedHeight }}>
        {testData.orders.map((el, i) => {
          return (
            <Order ingredients={el.ingredients}
              _id={el._id}
              number={el.number}
              createdAt={el.createdAt}
              name={el.name}
              key={i}
              status={el.status}
              usageCase='profile/orders'
            />
          )
        })}
      </ol>
      {/* <Outlet /> */}
    </>
  )
};

export default Orders;
