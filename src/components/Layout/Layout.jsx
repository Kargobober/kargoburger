import { Outlet } from 'react-router';
import AppHeader from '../AppHeader/AppHeader';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.outlet}>
      <AppHeader />
      <Outlet />
    </div>
  )
}

export default Layout;
