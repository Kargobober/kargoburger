import { RootState } from "../types";

export const getSelectedBun = (state: RootState) => state.burgerConstructor.selectedBun;
export const getIsBunNullish = (state: RootState) => !Boolean(state.burgerConstructor.selectedBun);
export const getSelectedProducts = (state: RootState) => state.burgerConstructor.selectedProducts;
export const getTotalPrice = (state: RootState) => {
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
