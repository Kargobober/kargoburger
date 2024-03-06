import { ReactNode, useEffect, useRef, useState } from 'react';
import { BurgerIcon, ListIcon, Logo, MenuIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import stylesTransition from './AppHeaderTransition.module.css';
import HeaderLink from './HeaderLink/HeaderLink';
import { Link, useLocation } from 'react-router-dom';
import useWindowSize from '../../utils/hooks/useWindowSize';
import Menu from './Menu/Menu';
import logoMobile from '../../images/logo-mobile.svg';
import Modal from '../Modal/Modal';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from '../../services/hooks';
import { setCoordBottomHeaderStore } from '../../services/slices/adaptability';
import { getCoordBottomHeader } from '../../services/selectors/adaptability';

function AppHeader(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const windowSize = useWindowSize();

  const refHeader = useRef<HTMLHeadingElement>(null);
  const coordBottomHeader = useSelector(getCoordBottomHeader);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [content, setContent] = useState<ReactNode>(null);

  const refTransition = useRef<HTMLDivElement>(null);

  const headerLinks = [
    { name: 'Конструктор', img: BurgerIcon, to: '/' },
    { name: 'Лента заказов', img: ListIcon, to: '/feed' },
    { name: 'Личный кабинет', img: ProfileIcon, to: '/profile' },
  ] //кавычки не ставим в значении поля иконок, иначе реакт не поймёт

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    buttonRef.current?.blur();
  };

  const desktop = (
    <nav className={styles['nav-bar']}>
      <ul className={styles['nav-bar-list']}>
        <li className={styles['nav-bar-item']}>
          <HeaderLink
            sectionName={headerLinks[0].name}
            Icon={headerLinks[0].img}
            to={headerLinks[0].to}
          />
        </li>
        <li className={styles['nav-bar-item']}>
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
  );

  const tablet = (
    <>
      <Link to='/' className='pl-5'><Logo /></Link>

      <button
        type='button'
        className={`text text_type_main-default text_color_primary buttonGlobal ${styles['nav-button']} pr-5`}
        ref={buttonRef}
        onClick={toggleModal}
      >
        <div className={styles.buttonMenuContent}>
          <span className='pr-2'>Меню</span>
          <MenuIcon type="primary" />
        </div>
      </button>
    </>
  );

  const mobile = (
    <>
      <Link to='/' className={`pl-2 ${styles.logoMobile}`}>
        <img src={logoMobile} />
      </Link>

      <button
        type='button'
        className={`text text_type_main-default text_color_primary buttonGlobal ${styles['nav-button']} pr-2`}
        ref={buttonRef}
        onClick={toggleModal}
      >
        <div className={styles.buttonMenuContent}>
          <MenuIcon type="primary" />
        </div>
      </button>
    </>
  );

  useEffect(() => {
    if (windowSize.width < 500) {
      setContent(mobile);
      return;
    } else if (windowSize.width < 1050) {
      setContent(tablet);
    } else {
      setContent(desktop);
    };
  }, [windowSize.width]);

  useEffect(() => {
    if (isModalOpen) toggleModal();
  }, [location]);

  useEffect(() => {
    if(refHeader.current){
      const newCoordBottomHeader = refHeader.current.getBoundingClientRect().bottom + window.scrollY;
      if (coordBottomHeader !== newCoordBottomHeader) {
        dispatch(setCoordBottomHeaderStore(newCoordBottomHeader));
      }
    }
  }, [windowSize.width, refHeader.current]);

  return (
    <header className={`${styles.header} ${windowSize.width < 500 ? 'pt-3 pb-3' : 'pt-4 pb-4'}`} ref={refHeader}>
      {content}
      <CSSTransition
        nodeRef={refTransition}
        in={isModalOpen}
        timeout={300}
        classNames={{ ...stylesTransition }}
        unmountOnExit
      >
        <Modal
          ref={refTransition}
          key={Date.now()}
          onClose={toggleModal}
          heading='Меню'
          extraClassContainer={styles.modalContainer}
        >
          <Menu data={headerLinks} />
        </Modal>
      </CSSTransition>
    </header>
  )
}

export default AppHeader;
