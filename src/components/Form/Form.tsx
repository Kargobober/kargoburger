import styles from './Form.module.css';
import { FC } from 'react';

type TProps = {
  heading?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  name: string;
  autoComplete?: string;
};

const Form: FC<TProps> = ({ children, heading, onSubmit, name, autoComplete = 'on' }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form} name={name} noValidate autoComplete={autoComplete}>
      {heading && <h2 className='text text_type_main-medium text_centered'>{heading}</h2>}
      <div className={styles.container}>
        {children}
      </div>
    </form>
  )
};

export default Form;
