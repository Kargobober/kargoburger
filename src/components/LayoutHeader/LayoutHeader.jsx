import { Outlet } from 'react-router';
import AppHeader from '../AppHeader/AppHeader';
import styles from './LayoutHeader.module.css';

function LayoutHeader() {
  return (
    <div className={styles.outlet}>
      <AppHeader />
      <Outlet />
    </div>
  )
}

export default LayoutHeader;
