import styles from './EditZone.module.css';
import { FC } from 'react';

const EditZone: FC = ({ children }) => {
  return (
    <section className={styles.section}>
      {children}
    </section>
  )
};

export default EditZone;
