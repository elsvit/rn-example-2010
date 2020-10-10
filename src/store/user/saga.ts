import { Alert } from 'react-native';
import { put, takeEvery } from 'redux-saga/effects';
import { api } from 'store';

import { setThumbnailImageAction } from 'store/auth';
import { IUser, IUserImage, IUserUpdateResponse, IResponse } from 'types';

import { setError, setLoaded, setLoading } from '../common';
import {
  IUploadImageAction,
  IUserUpdateAction,
  IUserVerifyEmailAction,
  uploadImageSaccessAction,
  setUserAction,
  UserActions,
  userUpdateSuccessAction,
} from './user';

export function* sagaGetUser() {
  const actionType = UserActions.USER_GET;
  try {
    yield put(setLoading({ actionType }));
    const user: IUser = yield api.userApi.getMyUser();
    yield put(setUserAction(user));
    yield put(setLoaded({ actionType }));
  } catch (error) {
    yield put(setError({ actionType, error }));
  }
}

export function* sagaUpdateUser({ payload }: IUserUpdateAction) {
  const actionType = UserActions.USER_UPDATE;
  try {
    yield put(setLoading({ actionType }));
    const res: IUserUpdateResponse = yield api.userApi.updateUser(payload);
    yield put(userUpdateSuccessAction(res));
    yield put(setLoaded({ actionType }));
  } catch (error) {
    yield put(setError({ actionType, error }));
  }
}

export function* sagaUploadImage({ payload }: IUploadImageAction) {
  const actionType = UserActions.UPLOAD_IMAGE;
  try {
    yield put(setLoading({ actionType }));
    const images: IResponse<IUserImage> = yield api.userApi.updateProfileImage(payload);
    if (images.data) {
      const newDate = new Date();
      const newTime = newDate.getTime();
      const newImage = `${images.data.profile_image_url}?t=${newTime}`;
      const newImageThumbnail = `${images.data.profile_image_thumbnail_url}?t=${newTime}`;
      yield put(
        uploadImageSaccessAction({
          profile_image_url: newImage,
          profile_image_thumbnail_url: newImageThumbnail,
        }),
      );
      yield put(setThumbnailImageAction(newImageThumbnail));
    }
    yield put(setLoaded({ actionType }));
  } catch (error) {
    yield put(setError({ actionType, error }));
  }
}

export function* sagaVerifyEmail({ payload }: IUserVerifyEmailAction) {
  const actionType = UserActions.USER_VERIFY_EMAIL;
  try {
    yield put(setLoading({ actionType }));
    const res: any = yield api.userApi.verifyEmail(payload);
    //yield put.... verify email action
    yield put(setLoaded({ actionType }));
  } catch (error) {
    yield put(setError({ actionType, error }));
  }
}

export function* sagaResendVerifyEmail() {
  const actionType = UserActions.RESEND_VERIFY_EMAIL;
  try {
    yield put(setLoading({ actionType }));
    const res: any = yield api.userApi.resendVerifyEmail();
    Alert.alert(
      'New Code sent to your email.',
      '',
      [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
    yield put(setLoaded({ actionType }));
  } catch (error) {
    yield put(setError({ actionType, error }));
  }
}

export default function*(): Generator {
  yield takeEvery(UserActions.USER_GET, sagaGetUser);
  yield takeEvery(UserActions.USER_UPDATE, sagaUpdateUser);
  yield takeEvery(UserActions.UPLOAD_IMAGE, sagaUploadImage);
  yield takeEvery(UserActions.USER_VERIFY_EMAIL, sagaVerifyEmail);
  yield takeEvery(UserActions.RESEND_VERIFY_EMAIL, sagaResendVerifyEmail);
}
