import { ProductsTypeList, TIngredient } from '../../utils/types';
import ingredientsReducer, { initialState } from './ingredientsSlice';

const ingredients: Array<TIngredient> = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: ProductsTypeList.bun,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: ProductsTypeList.main,
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: ProductsTypeList.main,
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: ProductsTypeList.sauce,
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: ProductsTypeList.sauce,
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0
  }
];

describe('Testing ingredientsSlice', () => {
  test('Testing the pending process', () => {
    expect(ingredientsReducer(initialState, {
      type: 'ingredients/get/pending'
    })).toEqual({
      isLoading: true,
      hasError: false,
      ingredientsData: [],
    });

    expect(ingredientsReducer(undefined, {
      type: 'ingredients/get/pending'
    })).toEqual({
      isLoading: true,
      hasError: false,
      ingredientsData: [],
    });
  });


  test('Testing the fulfilled response', () => {
    expect(ingredientsReducer(initialState, {
      type: 'ingredients/get/fulfilled',
      payload: {success: true, data: ingredients}
    })).toEqual({
      isLoading: false,
      hasError: false,
      ingredientsData: ingredients,
    });

    expect(ingredientsReducer(undefined, {
      type: 'ingredients/get/fulfilled',
      payload: {success: true, data: ingredients}
    })).toEqual({
      isLoading: false,
      hasError: false,
      ingredientsData: ingredients,
    });
  });


  test('Testing the rejected response', () => {
    expect(ingredientsReducer(initialState, {
      type: 'ingredients/get/rejected'
    })).toEqual({
      isLoading: false,
      hasError: true,
      ingredientsData: [],
    });

    expect(ingredientsReducer(undefined, {
      type: 'ingredients/get/rejected'
    })).toEqual({
      isLoading: false,
      hasError: true,
      ingredientsData: [],
    });
  });
});
