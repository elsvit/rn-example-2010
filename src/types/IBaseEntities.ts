export interface ILoadableBooleanDict {
  [actionType: string]: Maybe<boolean>;
}
export interface ILoadableStringDict {
  [actionType: string]: Maybe<string>;
}
export interface IStringObj {
  [key: string]: string;
}

export interface IId {
  id: string;
}

export interface IIdName extends IId {
  name: string;
}

export interface IResponse<T> {
  data: T;
}

export interface IOption {
  value: string;
  label: string;
}

export enum TextAlign {
  left = 'left',
  right = 'right',
}

export interface ILocation {
  address: string
}

export interface IListFilter {
  filter1: Maybe<string>
  filter2: Maybe<string>
}

export enum DateFilterType {
  ALL = 'all',
  LAST_WEEK = 'Last Week',
  LAST_MONTH = 'Last Month',
  LAST_3_MONTH = 'Last 3 Months',
  LAST_YEAR = 'Last Year',
}
