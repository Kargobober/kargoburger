import styles from './ActionsZone.module.css';
import React from 'react';

function ActionsZone({ children, className }) {
  return (
    <section className={className}>
      {children}
    </section>
  )
}

export default ActionsZone;
