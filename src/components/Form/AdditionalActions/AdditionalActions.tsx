import styles from './AdditionalActions.module.css';
import { FC } from 'react';

const AdditionalActions: FC = ({ children }) => {
  return (
    <section className={`${styles.section}`}>
      {children}
    </section>
  )
};

export default AdditionalActions;
