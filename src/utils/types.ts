export type TWithExtraId<T> = T & { readonly extraId: string };

enum ProductsTypeList {
  bun = 'bun',
  main = 'main',
  sauce = 'sauce',
}

export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: ProductsTypeList;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile?: string;
  readonly image_large?: string;
  readonly __v?: number,
};

// qty появляется в селекторе ingredientsSelector
export type TIngredientCounted = TIngredient & { qty: number };

export type TIngredientExtraId = TWithExtraId<TIngredient>;

export type TIngredientExtraIdCounted = TWithExtraId<TIngredientCounted>;

export type TSuperRef = {
  list: HTMLDivElement | null;
  buns: HTMLHeadingElement | null;
  sauces: HTMLHeadingElement | null;
  mainFillings: HTMLHeadingElement | null;
} | null;
