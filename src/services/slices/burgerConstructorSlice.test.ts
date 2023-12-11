import burgerConstructorReducer, { TStateBurgerConstructor, addItem, moveItem, removeItem, resetConstructor } from './burgerConstructorSlice';
import * as utils from '../../utils/utils';
import { ProductsTypeList } from '../../utils/types';

const bun = {
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
  __v: 0,
  // qty добавляется в селекторе ingredientsSelector.ts
  qty: 0,
};

const meat = {
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
};

const sauce = {
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
  __v: 0,
  qty: 0,
};

const bunWithId = { ...bun, extraId: 'myBun' };
const meatWithId = { ...meat, extraId: 'myMeat' };
const sauceWithId = { ...sauce, extraId: 'mySauce' };

const initialState: TStateBurgerConstructor = {
  selectedBun: null,
  selectedProducts: [],
};

const filledState: TStateBurgerConstructor = {
  selectedBun: bunWithId,
  selectedProducts: [meatWithId, sauceWithId],
};

describe('Testing burgerConstructorSlice', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Testing addItem - adding bun', () => {
    // нужно внутри теста делать мок, иначе мокнутая функция возвращает undefined
    const spyId = jest.spyOn(utils, 'getUniqId');
    spyId.mockReturnValue('123abc');

    expect(burgerConstructorReducer(initialState, addItem(bun))).toEqual({
      selectedBun: { ...bun, extraId: '123abc' },
      selectedProducts: [],
    });
    expect(burgerConstructorReducer(undefined, addItem(bun))).toEqual({
      selectedBun: { ...bun, extraId: '123abc' },
      selectedProducts: [],
    });
  });

  test('Testing addItem - adding product', () => {
    const spyId = jest.spyOn(utils, 'getUniqId');
    spyId.mockReturnValue('3abcd');

    expect(burgerConstructorReducer(initialState, addItem(meat))).toEqual({
      selectedBun: null,
      selectedProducts: [{ ...meat, extraId: '3abcd' }],
    });
    expect(burgerConstructorReducer(undefined, addItem(meat))).toEqual({
      selectedBun: null,
      selectedProducts: [{ ...meat, extraId: '3abcd' }],
    });
  });

  test('Testing removeItem', () => {
    // булочку нельзя удалить
    expect(burgerConstructorReducer(filledState, removeItem('myBun'))).toEqual({
      selectedBun: bunWithId,
      selectedProducts: [meatWithId, sauceWithId],
    });
    expect(burgerConstructorReducer(filledState, removeItem('myMeat'))).toEqual({
      selectedBun: bunWithId,
      selectedProducts: [sauceWithId],
    });
    expect(burgerConstructorReducer(filledState, removeItem('mySauce'))).toEqual({
      selectedBun: bunWithId,
      selectedProducts: [meatWithId],
    });
    expect(burgerConstructorReducer(undefined, removeItem('myProduct'))).toEqual({
      selectedBun: null,
      selectedProducts: [],
    });
    expect(burgerConstructorReducer(filledState, removeItem('myNonExistentId'))).toEqual({
      selectedBun: bunWithId,
      selectedProducts: [meatWithId, sauceWithId],
    });
  });

  test('Testing moveItem', () => {
    expect(burgerConstructorReducer(filledState, moveItem({
      indexFrom: 0,
      indexTo: 1,
      ingredient: meatWithId,
    }))).toEqual({
      selectedBun: bunWithId,
      selectedProducts: [sauceWithId, meatWithId],
    });
    expect(burgerConstructorReducer(undefined, moveItem({
      indexFrom: 0,
      indexTo: 3,
      ingredient: sauceWithId,
    }))).toEqual({
      selectedBun: null,
      selectedProducts: [sauceWithId],
    });
  })

  test('Testing resetConstructor', () => {
    expect(burgerConstructorReducer(filledState, resetConstructor())).toEqual(initialState);
    expect(burgerConstructorReducer(undefined, resetConstructor())).toEqual(initialState);
  })
});
