export const getSelectedBun = (state) => state.burgerConstructor.selectedBun;
export const getSelectedProducts = (state) => state.burgerConstructor.selectedProducts;
export const getTotalPrice = (state) => {
  let totalPrice = 0;
  let bunsPrice = 0;
  if(state.burgerConstructor.selectedBun) {
    bunsPrice = state.burgerConstructor.selectedBun.price * 2;
  }
  let fillingsPrice = 0;
  if(state.burgerConstructor.selectedProducts.length > 0) {
    fillingsPrice = state.burgerConstructor.selectedProducts.reduce((acc, el) => acc + el.price, 0);
  }
  totalPrice = bunsPrice + fillingsPrice;
  return totalPrice;
}
