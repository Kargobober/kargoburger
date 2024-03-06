import useWindowSize from '../../utils/hooks/useWindowSize';
import styles from './Form.module.css';
import { FC } from 'react';

type TProps = {
  heading?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  name: string;
  autoComplete?: string;
};

const Form: FC<TProps> = ({ children, heading, onSubmit, name, autoComplete = 'on' }) => {
  const windowSize = useWindowSize();

  const classTextHeading = windowSize.width > 599 ? 'text_type_main-large' : 'text_type_main-medium-extra';
  const paddingForHeading = windowSize.width > 599 ? 'pb-6' : 'pt-4 pb-6';

  return (
    <form onSubmit={onSubmit} className={styles.form} name={name} noValidate autoComplete={autoComplete}>
      {heading && <h2 className={`text ${classTextHeading} ${paddingForHeading} text_centered`}>{heading}</h2>}
      <div className={styles.container}>
        {children}
      </div>
    </form>
  )
};

export default Form;
