import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import HeaderLink from './HeaderLink/HeaderLink';
import { Link } from 'react-router-dom';

function AppHeader(): JSX.Element {
  const headerLinks = [
    { name: 'Конструктор', img: BurgerIcon, to: '/' },
    { name: 'Лента заказов', img: ListIcon, to: '/orders-global' },
    { name: 'Личный кабинет', img: ProfileIcon, to: '/profile' },
  ] //кавычки не ставим в значении поля иконок, иначе реакт не поймёт



  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles['nav-bar']}>

        <ul className={styles['nav-bar-list']}>
          <li>
            <HeaderLink
              sectionName={headerLinks[0].name}
              Icon={headerLinks[0].img}
              to={headerLinks[0].to}
            />
          </li>
          <li>
            <HeaderLink
              sectionName={headerLinks[1].name}
              Icon={headerLinks[1].img}
              to={headerLinks[1].to}
            />
          </li>
        </ul>

        {/* Условную адресацию сделать не вышло. Чтобы, находясь уже на главной, ссылка была нерабочей */}
        <Link to='/'><Logo /></Link>

        <HeaderLink
          sectionName={headerLinks[2].name}
          Icon={headerLinks[2].img}
          to={headerLinks[2].to}
          customStyle={
            { justifySelf: 'end', } //объект стилей
          }
        />
      </nav>
    </header>
  )
}

export default AppHeader;
