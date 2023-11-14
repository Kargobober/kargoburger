import toast from 'react-hot-toast';

export function handleError(text, error = '') {
  console.log(text + error);
}

export const getTopCoords = (elem) => {
  let box = elem.getBoundingClientRect();
  return box.top + window.scrollY;
}

/* я не разобрался, как передать кастомные css-переменные в объект style. Импорт переменной с цветом (colorInterfaceAccent) из constants не работал */
export const stellarToast = (text, notificationType) => toast(
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
