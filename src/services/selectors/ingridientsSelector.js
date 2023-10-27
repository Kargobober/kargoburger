export const getIngridients = (state) => state.ingridients.ingridientsData;
export const getIngridientsFiltred = (state) => ({
  buns: state.ingridients.ingridientsData.filter(el => el.type === 'bun'),
  sauces: state.ingridients.ingridientsData.filter(el => el.type === 'sauce'),
  mainFillings: state.ingridients.ingridientsData.filter(el => el.type === 'main'),
});
export const getLoadingStatus = (state) => state.ingridients.isLoading;
export const getErrorStatus = (state) => state.ingridients.hasError;
