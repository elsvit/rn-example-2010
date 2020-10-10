export interface IError {
  code: string;
  message: string;
  isError?: boolean;
  errors?: Maybe<IFieldError[]>
}

export interface IFieldError {
  location: string
  msg: string
  param: string
  value: string
}

