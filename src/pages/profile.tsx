import { useEffect, useState } from 'react';

import styles from './profile.module.css';
import { Outlet, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';


function ProfilePage() {
  const profileTabs = [
    {
      name: 'Профиль',
      path: '/profile',
      clue: `В этом разделе вы можете
      изменить свои персональные данные`,
    },
    {
      name: 'История заказов',
      path: '/profile/orders',
      clue: `В этом разделе вы можете
      просмотреть свою историю заказов`,
    },
    {
      name: 'Выход',
      path: '/profile/logout',
      clue: `Уже уходите? А вы попробовали
      БЕССМЕРТНОГО моллюска? 👾`,
    },
  ];
  type TProfileTab = typeof profileTabs[0];

  const location = useLocation();
  const [clue, setClue] = useState('');
  const getActiveStatus = (tab: TProfileTab) => tab.path === location.pathname ? styles.active : '';

  useEffect(() => {
    switch (location.pathname) {
      case '/profile':
        setClue(profileTabs[0].clue);
        break;
      case '/profile/orders':
        setClue(profileTabs[1].clue);
        break;
      default:
        setClue(profileTabs[2].clue);
        break;
    }
  }, [location]);



  return (
    <main className={styles.main}>
      <section className={styles.navSection}>

        <nav className={styles.nav}>
          <ul className={`listGlobal ${styles.list}`}>

            <li className={styles.item}>
              <NavLink
                to={profileTabs[0].path}
                className={`${styles.tab} text text_type_main-medium linkGlobal ${getActiveStatus(profileTabs[0])}`}
              >
                {profileTabs[0].name}
              </NavLink>
            </li>

            <li className={styles.item}>
              <NavLink
                to={profileTabs[1].path}
                className={`${styles.tab} text text_type_main-medium linkGlobal  ${getActiveStatus(profileTabs[1])}`}
              >
                {profileTabs[1].name}
              </NavLink>
            </li>

            <li className={styles.item}>
              <NavLink
                to={profileTabs[2].path}
                className={`${styles.tab} text text_type_main-medium linkGlobal  ${getActiveStatus(profileTabs[2])}`}
              >
                {profileTabs[2].name}
              </NavLink>
            </li>

          </ul>
        </nav>

        <p className={`${styles.clue} text text_type_main-default text_color_inactive`}>{clue}</p>

      </section>

      <Outlet />
    </main>
  )
}

export default ProfilePage;
