import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import HeaderLink from './HeaderLink/HeaderLink';

function AppHeader() {
  const headerLinks = [
    { name: 'Конструктор', img: BurgerIcon },
    { name: 'Лента заказов', img: ListIcon },
    { name: 'Личный кабинет', img: ProfileIcon },
  ] //кавычки не ставим в значении поля иконок, иначе реакт не поймёт
  const [currentSection, setCurrentSection] = React.useState(headerLinks[0].name);

  const toggleSection = (sectionName) => (evt) => {
    setCurrentSection(sectionName);
  }

  const isActive = (index) => headerLinks[index].name === currentSection ? true : false;

  return (
    <header className={ `${styles.header} pt-4 pb-4` }>
      <nav className={styles['nav-bar']}>

        <ul className={styles['nav-bar-list']}>
          <li>
            <HeaderLink
              sectionName={headerLinks[0].name}
              Icon={headerLinks[0].img}
              callback={toggleSection(headerLinks[0].name)}
              isActive={isActive(0)}
            />
          </li>
          <li>
            <HeaderLink
              sectionName={headerLinks[1].name}
              Icon={headerLinks[1].img}
              callback={toggleSection(headerLinks[1].name)}
              isActive={isActive(1)}
            />
          </li>
        </ul>

        <Logo />

        <HeaderLink
          sectionName={headerLinks[2].name}
          Icon={headerLinks[2].img}
          callback={toggleSection(headerLinks[2].name)}
          isActive={isActive(2)}
          customStyle={
            { justifySelf: 'end', } //объект стилей
          }
        />
      </nav>
    </header>
  )
}

export default AppHeader;
