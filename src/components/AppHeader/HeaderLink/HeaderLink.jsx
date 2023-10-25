import styles from './HeaderLink.module.css';
import PropTypes from 'prop-types';

function HeaderLink({ sectionName, Icon, callback, isActive, customStyle }) {

  return (
    <a href="#"
      style={customStyle}
      className={styles.link}
      onClick={callback}
    >
      <Icon type={ isActive ? "primary" : "secondary"} />
      <p
        className={ isActive ? "text text_type_main-default ml-2"
          : "text text_type_main-default ml-2 text_color_inactive"
        }
      >{sectionName}</p>
    </a>
  )
}

HeaderLink.propTypes = {
  sectionName: PropTypes.string.isRequired,
  Icon: PropTypes.func,
  callback: PropTypes.func,
  isActive: PropTypes.bool,
  customStyle: PropTypes.object,
}

export default HeaderLink;
