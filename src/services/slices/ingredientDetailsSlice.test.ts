import { ProductsTypeList } from '../../utils/types';
import ingredientDetailsReducer, { initialState, clearInfo, setInfo } from './ingredientDetailsSlice';

const data = {
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
  __v: 0,
  qty: 0,
  extraId: 'qwerty',
};

const filledState = {
  isFilled: true,
  ingredient: data,
};

describe('Testing ingredientDetailsSlice', () => {
  test('Testing setInfo', () => {
    expect(ingredientDetailsReducer(initialState, setInfo(data))).toEqual({
      isFilled: true,
      ingredient: data,
    });
    expect(ingredientDetailsReducer(undefined, setInfo(data))).toEqual({
      isFilled: true,
      ingredient: data,
    });
  });

  test('Testing clearInfo', () => {
    expect(ingredientDetailsReducer(filledState, clearInfo())).toEqual(initialState);
    expect(ingredientDetailsReducer(undefined, clearInfo())).toEqual(initialState);
  });
})
