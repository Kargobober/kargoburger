import { NavLink, useLocation } from 'react-router-dom';
import styles from './HeaderLink.module.css';
import { useEffect, useRef, useState, FC } from 'react';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

type THeaderLinkProps = {
  sectionName: string;
  Icon?: FC<TIconProps>;
  customStyle?: React.CSSProperties;
  to: string;
};



function HeaderLink ({ sectionName, Icon, customStyle, to }: THeaderLinkProps): JSX.Element {
  const location = useLocation();

  const navLinkRef = useRef<HTMLAnchorElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // класс active добавляется встроенным функционалом NavLink из react-router-dom
    if (navLinkRef.current && navLinkRef.current.classList.contains('active')) {
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
        {Icon && (<Icon type={isActive ? "primary" : "secondary"} />)}
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

export default HeaderLink;
