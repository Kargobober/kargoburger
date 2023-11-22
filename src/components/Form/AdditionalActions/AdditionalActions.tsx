import styles from './AdditionalActions.module.css';
import { FC } from 'react';

const AdditionalActions: FC = ({ children }) => {
  return (
    <section className={`mt-20 ${styles.section}`}>
      {children}
    </section>
  )
};

export default AdditionalActions;
