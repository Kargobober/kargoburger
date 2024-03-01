import { ArrowDownIcon, CloseIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './Menu.module.css';
import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import HeaderLink from '../HeaderLink/HeaderLink';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { Collapse } from 'react-collapse';

type TProps ={
  data: Array<{
    name: string,
    img: FC<TIconProps>,
    to: string,
  }>;
  /**
   * обработчик переключения видимости поповера (toggle-режим)
   */
  handler?: () => void;
};

const Menu: FC<TProps> = ({data, handler}) => {
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
  useEffect(() => {
    if (handler) {
      const handleEsc = (evt: KeyboardEvent) => {
        if (evt.key === "Escape") handler();
      };
      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, []);

  return (
    <div className={styles.containerModal}>
      <section className={styles.containerContent}>
        <div className={`${styles.header}`}>
          <h2 className='text text_type_main-medium-extra text_color_primary'>Меню</h2>
          <div  onClick={handler}>
            <CloseIcon type='primary' />
          </div>
        </div>

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
                Личный кабинет
                <div className={styles.arrowWrapper}>
                  <ArrowDownIcon type={isProfileButtonActive ? 'primary' : 'secondary'} />
                </div>
              </button>
              <Collapse
                isOpened={isMenuWindowOpen}
              >
                <ul className='listGlobal text_color_primary'>
                  <li className={styles.profileLinks}>
                    <NavLink
                    // черта после profile влияет на правильное распознование активности ссылки
                      to='/profile/'
                      className={({isActive}) =>
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
                      className={({isActive}) =>
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
                      className={({isActive}) =>
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
      </section>
      <ModalOverlay onClose={handler}/>
    </div>
  )
}

export default Menu;
