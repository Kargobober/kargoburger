import styles from './AdditionalActions.module.css';
import React from 'react';

function AdditionalActions({ children }) {
  return (
    <section className={`mt-20 ${styles.section}`}>
      {children}
    </section>
  )
}

export default AdditionalActions;
