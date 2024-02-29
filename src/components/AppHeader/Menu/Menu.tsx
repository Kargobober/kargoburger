import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactNode, useEffect } from 'react';
import styles from './Menu.module.css';
import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import HeaderLink from '../HeaderLink/HeaderLink';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

type TProps ={
  data: Array<{
    name: string,
    img: FC<TIconProps>,
    to: string,
  }>;
  handler?: () => void;
};

const Menu: FC<TProps> = ({data, handler}) => {
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
          <ul className='listGlobal text_color_primary'>
            <li>
              <HeaderLink
                sectionName={data[2].name}
                Icon={data[2].img}
                to={data[2].to}
              />
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
