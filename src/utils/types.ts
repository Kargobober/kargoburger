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

export type TWithExtraId<T> = T & { readonly extraId: string };
