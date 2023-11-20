import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found-404.module.css';

function NotFound404Page() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={`${styles.heading} text text_type_main-large mt-30 mb-10`}>😕 Страница не найдена 👀</h1>
        <Link to='/' className={`text text_type_main-medium linkGlobal ${styles.link}`}>
          Перейти на <span className={styles.span}>главную</span>
          </Link>
      </main>
    </>
  )
}

export default NotFound404Page;
