export const ingredientsSmart = {
  buns: [],
  sauces: [],
  mainFillings: [],
};

export const getIngredients = (state) => state.ingredients.ingredientsData;
export const getCountedFiltredIngredients = (state) => {
  // В хранилище в поле ingredients хранятся все ингридиенты, приходящие с сервера
  // Фильтруем из этого поля только булки
  const bunsFromServer = state.ingredients.ingredientsData.filter(el => el.type === 'bun');
  // Создаём новый массив булок с добавочным полем "количество"
  const bunsCounted = bunsFromServer.map(item => {
    return {
      ...item,
      qty: state.burgerConstructor.selectedBun == null ? 0
        : state.burgerConstructor.selectedBun._id === item._id ? 2
          : 0,
    }
  });
  ingredientsSmart.buns = bunsCounted;

  const saucesFromServer = state.ingredients.ingredientsData.filter(el => el.type === 'sauce');
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
  ingredientsSmart.sauces = saucesCounted;

  const mainFillingsFromServer = state.ingredients.ingredientsData.filter(el => el.type === 'main');
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
  ingredientsSmart.mainFillings = mainFillingsCounted;


  return ingredientsSmart;
};

export const getLoadingStatus = (state) => state.ingredients.isLoading;
export const getErrorStatus = (state) => state.ingredients.hasError;
