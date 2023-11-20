import { Link } from 'react-router-dom';
import styles from './Action.module.css';
import PropTypes from "prop-types";

function Action({ placeholder, linkText, to }) {
  return (
    <div className={styles.container}>
      <p className='text text_centred text_type_main-default text_color_inactive'>{placeholder}</p>
      <Link to={to} className='text text_type_main-default text_color_accent linkGlobal'>{linkText}</Link>
    </div>
  )
}

Action.propTypes = {
  placeholder: PropTypes.string,
  linkText: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}
export default Action;
