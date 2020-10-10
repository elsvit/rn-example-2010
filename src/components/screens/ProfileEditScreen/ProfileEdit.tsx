import _ from 'lodash';
import * as React from 'react';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';

import { getCommonByAction } from 'services/utils';
import { IAppState } from 'store';
import { resetCommonByTypeAction } from 'store/common';
import {
  setNeedEmailVerifyAction,
  uploadImageAction,
  UserActions,
  userUpdateAction,
} from 'store/user';
import { INavigationProps, IUser, Screen } from 'types';
import { Spinner } from 'ui';
import ProfileView from './ProfileEditView';

const ProfileEdit = ({ navigation, route }: INavigationProps) => {
  const dispatch = useDispatch();

  const [isEmailVerify, setEmailVerify] = React.useState(false);
  const [photo, setPhoto] = React.useState<Maybe<ImagePickerResponse>>(null);

  const { loading, loaded, apiErrorMessage, apiFieldsErrors } = getCommonByAction(
    UserActions.USER_UPDATE,
  );
  const user: Maybe<IUser> = useSelector((state: IAppState) => state.user.user);
  const needEmailVerify: boolean = useSelector((state: IAppState) => state.user.needEmailVerify);

  const token: Maybe<string> = useSelector((state: IAppState) => state.auth.token);

  React.useEffect(() => {
    if (needEmailVerify) {
      navigation.navigate(Screen.VerifyEmail);
      dispatch(setNeedEmailVerifyAction(false));
    }
  }, [needEmailVerify]);

  React.useEffect(() => {
    if (loading === false && loaded === true) {
      dispatch(resetCommonByTypeAction({ actionType: UserActions.USER_UPDATE }));
      navigation.navigate(Screen.Profile);
    }
  }, [loading, loaded]);

  const onSubmit = (user: IUser, isEmailChanged: boolean) => {
    dispatch(userUpdateAction(user));
  };

  const onUploadImg = () => {
    const options = {
      noData: true,
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        setPhoto(response);
      }
    });
  };

  React.useEffect(() => {
    if (_.get(route, 'params.open_image_picker')) {
      onUploadImg();
    }
  }, []);

  const onPhotoModalSubmit = () => {
    photo && dispatch(uploadImageAction(photo));

    setPhoto(null);
  };

  const onPhotoModalClose = () => {
    setPhoto(null);
  };

  const onBack = () => {
    navigation.goBack(null);
  };

  if (!user) {
    return <Spinner goBack={onBack} />;
  }

  return (
    <ProfileView
      user={user}
      photo={photo}
      onSubmit={onSubmit}
      onUploadImg={onUploadImg}
      onPhotoModalSubmit={onPhotoModalSubmit}
      onPhotoModalClose={onPhotoModalClose}
      onBack={onBack}
      disabled={!!loading}
      apiError={apiErrorMessage}
      apiFieldsErrors={apiFieldsErrors}
    />
  );
};

export default ProfileEdit;
