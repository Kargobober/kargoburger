import styles from './Form.module.css';
import React from 'react';

function Form({ children, heading, onSubmit, name }) {
  return (
    <form onSubmit={onSubmit} className={styles.form} name={name} noValidate>
      <h2 className='text text_type_main-medium text_centered'>{heading}</h2>
      <div className={styles.container}>
        {children}
      </div>
    </form>
  )
}

export default Form;
