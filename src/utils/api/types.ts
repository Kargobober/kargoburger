// Типизировать негативный ответ промиса не нужно, т.к. res.ok = false может быть из-за множества разных причин

import { TIngredient } from "../types";

export type TUser = {
  email: string;
  name: string;
};

export type TResponseBasic = {
  readonly success: boolean;
  readonly message: string;
};


/**
 @param token refreshToken value
 */
export type TRequestRefreshToken = {
  token: string;
};
export type TResponseRefreshToken = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};


export type TRequestPasswordForgot = {
  email: string;
};
export type TResponsePasswordForgot = TResponseBasic;


/**
 * @param token Код восстановления, из письма
 */
export type TRequestPasswordReset = {
  password: string;
  token: string;
};
export type TResponsePasswordReset = TResponseBasic;


export type TRequestRegistration = {
  email: string;
  password: string;
  name: string;
};
export type TResponseRegistration = {
  readonly success: boolean;
  readonly user: TUser;
  readonly accessToken: string;
  readonly refreshToken: string;
};


export type TRequestLogin = {
  email: string;
  password: string;
};
export type TResponseLogin = TResponseRegistration;


export type TResponseLogOut = TResponseBasic;


export type TCatcher<T> = (url: string, options: RequestInit, err: unknown) => Promise<T>;


export type TResponseIngredients = {
  readonly success: boolean;
  readonly data: TIngredient[];
};


/**
 * @param ingredient array of '_id'
 */
export type TRequestOrder = {
  ingredients: string[];
};
export type TResponseOrder = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

/**
 * @param token accesToken value
 */
export type TRequestGetUser = {
  token: string;
};
export type TResponseGetUser = {
  succes: boolean;
  user: TUser;
};

export type TRequestChangeUserData = TUser & {password: string};
export type TResponseChangeUserData = TResponseGetUser;
