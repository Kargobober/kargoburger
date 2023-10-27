export const getIngridients = (state) => state.ingridients.ingridientsData;
export const getCountedFiltredIngridients = (state) => {
  const ingridientsSmart = {
    buns: null,
    sauces: [],
    mainFillings: [],
  };

  // В хранилище в поле ingridients хранятся все ингридиенты, приходящие с сервера
  // Фильтруем из этого поля только булки
  const bunsFromServer = state.ingridients.ingridientsData.filter(el => el.type === 'bun');
  // Создаём новый массив булок с добавочным полем "количество"
  const bunsCounted = bunsFromServer.map(item => {
    return {
      ...item,
      qty: state.burgerConstructor.selectedBun == null ? 0
        : state.burgerConstructor.selectedBun._id === item._id ? 2
          : 0,
    }
  });
  ingridientsSmart.buns = bunsCounted;

  const saucesFromServer = state.ingridients.ingridientsData.filter(el => el.type === 'sauce');
  const saucesCounted = saucesFromServer.map(item => {
    return {
      ...item,
      qty: state.burgerConstructor.selectedProducts.reduce((acc, selectedProduct) => {
        if (selectedProduct._id === item._id) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0),
    }
  });
  ingridientsSmart.sauces = saucesCounted;

  const mainFillingsFromServer = state.ingridients.ingridientsData.filter(el => el.type === 'main');
  const mainFillingsCounted = mainFillingsFromServer.map(item => {
    return {
      ...item,
      qty: state.burgerConstructor.selectedProducts.reduce((acc, selectedProduct) => {
        if (selectedProduct._id === item._id) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0),
    }
  });
  ingridientsSmart.mainFillings = mainFillingsCounted;


  return ingridientsSmart;
};

export const getLoadingStatus = (state) => state.ingridients.isLoading;
export const getErrorStatus = (state) => state.ingridients.hasError;
