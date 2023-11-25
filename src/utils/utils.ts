// в тостах типы прописаны в родном же пакете
import toast from 'react-hot-toast';
// для uuid установлен ещё один пакет
import { v4 as uuidv4 } from 'uuid';
import { TIngredient, TIngredientExtraId } from './types';

type TErrorHandler = (text: string, error?: unknown) => void;

export const handleError: TErrorHandler = (text, error = '') => {
  console.log(text + error);
};

export const getTopCoords = (elem: HTMLElement) => {
  let box = elem.getBoundingClientRect();
  return box.top + window.scrollY;
}

/* я не разобрался, как передать кастомные css-переменные в объект style. Импорт переменной с цветом (colorInterfaceAccent) из constants не работал */
export const stellarToast = (text: string, notificationType?: 'ok' | 'error') => toast(
  text,
  {
    duration: notificationType === 'ok' ? 3000 : 6000,
    position: 'bottom-right',
    style: {
      background: '#4c4cff',
      color: '#fff',
      padding: '5px 15px',
    },
    className: 'text text_type_main-default',
    icon: notificationType === 'ok' ? '✅' : '❌',
  }
);

export const findIngredientObj = (id: string, arr: TIngredient[]): TIngredientExtraId | null => {
  const ingredient = arr.find(item => item._id === id ? true : false);
  if (ingredient) {
    // нельзя мутировать объект почему-то ↓
    const ingredientUniq = { ...ingredient, extraId: uuidv4() };
    return ingredientUniq;
  } else {
    return null;
  }
};
