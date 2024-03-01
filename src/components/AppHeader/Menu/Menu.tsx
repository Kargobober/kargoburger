import { ArrowDownIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import styles from './Menu.module.css';
import HeaderLink from '../HeaderLink/HeaderLink';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { Collapse } from 'react-collapse';

type TProps = {
  data: Array<{
    name: string,
    img: FC<TIconProps>,
    to: string,
  }>;
};

const Menu: FC<TProps> = ({ data }) => {
  const location = useLocation();

  const [isProfileButtonActive, setIsProfileButtonActive] = useState(false);
  useEffect(() => {
    // класс active добавляется встроенным функционалом NavLink из react-router-dom
    if (location.pathname.includes('profile')) {
      setIsProfileButtonActive(true);
      setIsMenuWindowOpen(true);
    } else {
      setIsProfileButtonActive(false);
    }
  }, [location]);

  const [isMenuWindowOpen, setIsMenuWindowOpen] = useState(false);
  const onProfileButtonClick = () => {
    setIsMenuWindowOpen(prev => !prev);
  }

  return (
    <div className={styles.containerModal}>
      <nav>
        <ul className={`listGlobal text_color_primary ${styles.menuList}`}>
          <li>
            <button
              className={`buttonGlobal text_type_main-default ${styles.buttonProfile}` + ' ' + (isProfileButtonActive ? 'text_color_primary' : 'text_color_inactive')}
              onClick={onProfileButtonClick}
            >
              <div className={styles.personIcoWrapper}>
                <ProfileIcon type={isProfileButtonActive ? 'primary' : 'secondary'} />
              </div>
              {data[2].name}
              <div className={`${styles.arrowWrapper} ${isMenuWindowOpen ? styles.arrowDown : ''}`}>
                <ArrowDownIcon type={isProfileButtonActive ? 'primary' : 'secondary'} />
              </div>
            </button>

            <Collapse
              isOpened={isMenuWindowOpen}
              theme={{ collapse: styles.collapseWrapper }}
            >
              <ul className='listGlobal text_color_primary'>
                <li className={styles.profileLinks}>
                  <NavLink
                    // черта после profile влияет на правильное распознование активности ссылки
                    to='/profile/'
                    className={({ isActive }) =>
                      [
                        'linkGlobal',
                        isActive ? 'text_color_primary' : 'text_color_inactive',
                        'text_type_main-default'
                      ].join(' ')
                    }
                  >
                    Профиль
                  </NavLink>
                </li>
                <li className={styles.profileLinks}>
                  <NavLink
                    to='/profile/orders'
                    className={({ isActive }) =>
                      [
                        'linkGlobal',
                        isActive ? 'text_color_primary' : 'text_color_inactive',
                        'text_type_main-default'
                      ].join(' ')
                    }
                  >
                    История заказов
                  </NavLink>
                </li>
                <li className={styles.profileLinks}>
                  <NavLink
                    to='/profile/logout'
                    className={({ isActive }) =>
                      [
                        'linkGlobal',
                        isActive ? 'text_color_primary' : 'text_color_inactive',
                        'text_type_main-default'
                      ].join(' ')
                    }
                  >
                    Выход
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <HeaderLink
              sectionName={data[0].name}
              Icon={data[0].img}
              to={data[0].to}
            />
          </li>
          <li>
            <HeaderLink
              sectionName={data[1].name}
              Icon={data[1].img}
              to={data[1].to}
            />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Menu;
