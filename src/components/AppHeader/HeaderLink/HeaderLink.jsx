import { NavLink, useLocation } from 'react-router-dom';
import styles from './HeaderLink.module.css';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

function HeaderLink({ sectionName, Icon, customStyle, to }) {
  const location = useLocation();

  const navLinkRef = useRef();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // класс active добавляется встроенным функционалом NavLink из react-router-dom
    if (navLinkRef.current.classList.contains('active')) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location]);

  return (
    <div style={customStyle}>
      <NavLink
        to={to}
        className={styles.link}
        ref={navLinkRef}
      >
        <Icon type={isActive ? "primary" : "secondary"} />
        <p
          className={isActive ? "text text_type_main-default ml-2"
            : "text text_type_main-default ml-2 text_color_inactive"
          }
        >
          {sectionName}
        </p>
      </NavLink>
    </div>
  )
}

HeaderLink.propTypes = {
  sectionName: PropTypes.string.isRequired,
  Icon: PropTypes.func,
  customStyle: PropTypes.object,
  to: PropTypes.string,
}

export default HeaderLink;
