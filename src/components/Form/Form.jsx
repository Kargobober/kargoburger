import styles from './Form.module.css';
import PropTypes from "prop-types";

function Form({ children, heading, onSubmit, name, autoComplete = 'on' }) {
  return (
    <form onSubmit={onSubmit} className={styles.form} name={name} noValidate autoComplete={autoComplete}>
      {heading && <h2 className='text text_type_main-medium text_centered'>{heading}</h2>}
      <div className={styles.container}>
        {children}
      </div>
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
}

export default Form;
