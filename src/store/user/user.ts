import { ImagePickerResponse } from 'react-native-image-picker';
import { Reducer } from 'redux';

import {
  IUser,
  ICode,
  IUserEdit,
  IUserImage,
  IUserUpdateResponse,
} from 'types/IUser';

// Actions
export enum UserActions {
  USER_GET = 'user/GET',
  USER_SET = 'user/SET',
  USER_UPDATE = 'user/USER_UPDATE',
  USER_UPDATE_SUCCESS = 'user/USER_UPDATE_SUCCESS',
  UPLOAD_IMAGE = 'user/UPLOAD_IMAGE',
  UPLOAD_IMAGE_SUCCESS = 'user/USER_UPLOAD_IMAGE',
  USER_VERIFY_EMAIL = 'user/USER_VERIFY_EMAIL',
  USER_VERIFY_EMAIL_SUCCESS = 'user/USER_VERIFY_EMAIL_SUCCESS',
  RESEND_VERIFY_EMAIL = 'user/RESEND_VERIFY_EMAIL',
  RESEND_VERIFY_EMAIL_SUCCESS = 'user/RESEND_VERIFY_EMAIL_SUCCESS',
  SET_NEED_EMAIL_VERIFY = 'user/SET_NEED_EMAIL_VERIFY',
  USER_RESET = 'user/RESET',
}

export type UserLoadableT =
  | typeof UserActions.USER_GET
  | typeof UserActions.USER_UPDATE
  | typeof UserActions.UPLOAD_IMAGE
  | typeof UserActions.USER_VERIFY_EMAIL
  | typeof UserActions.RESEND_VERIFY_EMAIL;

export interface IUserSetAction {
  type: typeof UserActions.USER_SET;
  payload: IUser;
}

export interface IUserGetAction {
  type: typeof UserActions.USER_GET;
}

export interface IUserUpdateAction {
  type: typeof UserActions.USER_UPDATE;
  payload: IUserEdit;
}

export interface IUserUpdateSuccessAction {
  type: typeof UserActions.USER_UPDATE_SUCCESS;
  payload: IUserUpdateResponse;
}

export interface IUploadImageAction {
  type: typeof UserActions.UPLOAD_IMAGE;
  payload: ImagePickerResponse;
}

export interface IUploadImageSaccessAction {
  type: typeof UserActions.UPLOAD_IMAGE_SUCCESS;
  payload: IUserImage;
}

export interface IUserVerifyEmailAction {
  type: typeof UserActions.USER_VERIFY_EMAIL;
  payload: ICode;
}

export interface IUserVerifyEmailSuccessAction {
  type: typeof UserActions.USER_VERIFY_EMAIL_SUCCESS;
}

export interface IResendVerifyEmailAction {
  type: typeof UserActions.RESEND_VERIFY_EMAIL;
}

export interface IResendVerifyEmailSuccessAction {
  type: typeof UserActions.RESEND_VERIFY_EMAIL_SUCCESS;
}

export interface ISetNeedEmailVerifyAction {
  type: typeof UserActions.SET_NEED_EMAIL_VERIFY;
  payload: boolean;
}

export interface IResetUserAction {
  type: typeof UserActions.USER_RESET;
}

type UserActionsT =
  | IUserSetAction
  | IUserGetAction
  | IUserUpdateAction
  | IUserUpdateSuccessAction
  | IUploadImageAction
  | IUploadImageSaccessAction
  | IUserVerifyEmailAction
  | IUserVerifyEmailSuccessAction
  | IResendVerifyEmailAction
  | IResendVerifyEmailSuccessAction
  | ISetNeedEmailVerifyAction
  | IResetUserAction;

export const setUserAction = (payload: IUser): IUserSetAction => ({
  type: UserActions.USER_SET,
  payload,
});

export const getUserAction = (): IUserGetAction => ({
  type: UserActions.USER_GET,
});

export const userUpdateAction = (payload: IUserEdit): IUserUpdateAction => ({
  type: UserActions.USER_UPDATE,
  payload,
});

export const userUpdateSuccessAction = (
  payload: IUserUpdateResponse,
): IUserUpdateSuccessAction => ({
  type: UserActions.USER_UPDATE_SUCCESS,
  payload,
});

export const uploadImageAction = (payload: ImagePickerResponse): IUploadImageAction => ({
  type: UserActions.UPLOAD_IMAGE,
  payload,
});

export const uploadImageSaccessAction = (payload: IUserImage): IUploadImageSaccessAction => ({
  type: UserActions.UPLOAD_IMAGE_SUCCESS,
  payload,
});

export const verifyEmailAction = (payload: ICode): IUserVerifyEmailAction => ({
  type: UserActions.USER_VERIFY_EMAIL,
  payload,
});

export const verifyEmailSuccessAction = (): IUserVerifyEmailSuccessAction => ({
  type: UserActions.USER_VERIFY_EMAIL_SUCCESS,
});

export const resendVerifyEmailAction = (): IResendVerifyEmailAction => ({
  type: UserActions.RESEND_VERIFY_EMAIL,
});

export const resendVerifyEmailSuccessAction = (): IResendVerifyEmailSuccessAction => ({
  type: UserActions.RESEND_VERIFY_EMAIL_SUCCESS,
});

export const setNeedEmailVerifyAction = (payload: boolean): ISetNeedEmailVerifyAction => ({
  type: UserActions.SET_NEED_EMAIL_VERIFY,
  payload,
});

export const resetUserAction = (): IResetUserAction => ({
  type: UserActions.USER_RESET,
});

//Reducer
interface IUserState {
  user: Maybe<IUser>;
  needEmailVerify: boolean;
}

export type UserStateT = Readonly<IUserState>;

const initialState: IUserState = {
  user: null,
  needEmailVerify: false,
};

const reducer: Reducer<UserStateT> = (state: IUserState = initialState, action: UserActionsT) => {
  switch (action.type) {
    case UserActions.USER_SET:
      return { ...state, user: action.payload };

    case UserActions.USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
        needEmailVerify: action.payload.need_email_verify,
      };

    case UserActions.UPLOAD_IMAGE_SUCCESS:
      const user = state.user ? { ...state.user, ...action.payload } : null;
      return { ...state, user };


    case UserActions.SET_NEED_EMAIL_VERIFY:
      return { ...state, needEmailVerify: action.payload };

    case UserActions.USER_RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
