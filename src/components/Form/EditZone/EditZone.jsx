import styles from './EditZone.module.css';
import React from 'react';

function EditZone({ children }) {
  return (
    <section className={styles.section}>
      {children}
    </section>
  )
}

export default EditZone;
