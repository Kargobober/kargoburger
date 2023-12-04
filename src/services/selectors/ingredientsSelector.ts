import { TIngredientCounted } from "../../utils/types";
import { RootState } from "../types";



export const getIngredients = (state: RootState) => state.ingredients.ingredientsData;

export const getCountedFiltredIngredients = (state: RootState) => {
  type TIngredientsSmart = {
    buns: TIngredientCounted[];
    sauces: TIngredientCounted[];
    mainFillings: TIngredientCounted[];
  };
  const ingredientsSmart: TIngredientsSmart = {
    buns: [],
    sauces: [],
    mainFillings: [],
  };



  /* В хранилище, в поле ingredients, хранятся все ингредиенты, приходящие с сервера.
    У них тип TIngredient, т.е. нет полей qty и extraId */
  // Фильтруем только булки
  const bunsFromServer = state.ingredients.ingredientsData.filter(el => el.type === 'bun');
  // Создаём новый массив булок с добавочным полем "количество" - "qty"
  const bunsCounted: TIngredientCounted[] = bunsFromServer.map(item => {
    /* Т.е. из бургер-конструктора (в него объекты ингредиентов попадают с двумя новыми ключами: qty и extraId)
    мы лишь считываем данные объектов, а возвращаем объект из bunsFromServer (мапится item оттуда),   (1)
    т.е. тип TIngredient + добавляем qty → TIngredientCounted */
    return {
      ...item,
      qty: state.burgerConstructor.selectedBun == null ? 0
        : state.burgerConstructor.selectedBun._id === item._id ? 2
          : 0,
    }
    // А при добавлении ингр-та в конструктор к qty добавится extraId, но в ингредиенты вернется TIngredientCounted (см. 1)
    // extraId создается при диспатче ингредиента в конструктор. В самом списке ингр-ов элементы без уник. ключа
  });
  ingredientsSmart.buns = bunsCounted;



  const saucesFromServer = state.ingredients.ingredientsData.filter(el => el.type === 'sauce');
  const saucesCounted: TIngredientCounted[] = saucesFromServer.map(item => {
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
  const mainFillingsCounted: TIngredientCounted[] = mainFillingsFromServer.map(item => {
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

export const getLoadingStatus = (state: RootState) => state.ingredients.isLoading;
export const getErrorStatus = (state: RootState) => state.ingredients.hasError;
