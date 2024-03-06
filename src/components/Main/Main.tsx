import styles from './Main.module.css';
import { memo } from 'react';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { useSelector } from '../../services/hooks';
import { getCoordBottomHeader } from '../../services/selectors/adaptability';
import useWindowSize from '../../utils/hooks/useWindowSize';

function Main() {
  const { width: clientWidth } = useWindowSize();
  const coordBottomHeader = useSelector(getCoordBottomHeader);

  return (
    <main className={styles.main} style={{ height: `calc(100% - ${coordBottomHeader}px)`}}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <BurgerIngredients />
        {clientWidth > 1049 && (<BurgerConstructor />)}
      </DndProvider>
    </main>
  )
}

export default memo(Main);
