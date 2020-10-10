import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { getCommonByAction } from 'services/utils';
import { useFocusEffect } from '@react-navigation/native';

import { IAppState } from 'store';
import { signinAction, AuthActions, initAction } from 'store/auth';
import { resetCommonByTypeAction } from 'store/common';
import { ISignInUser, DEFAULT_SIGNIN_USER } from 'types/IAuth';
import { Screen } from 'types/INavigation';

import LoginView from './LoginView';

const Login = ({ navigation }: NavigationInjectedProps) => {
  const dispatch = useDispatch();

  const [formKey, setFormKey] = React.useState('formKey');
  const [user, setUser] = React.useState<ISignInUser>(DEFAULT_SIGNIN_USER);

  const token = useSelector((state: IAppState) => state.auth.token);

  const { loading, loaded, apiErrorMessage, apiFieldsErrors } = getCommonByAction(
    AuthActions.SIGNIN,
  );

  React.useEffect((): any => {
    dispatch(initAction());
  }, []);

  // @ts-ignore
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     dispatch(resetCommonByTypeAction({ actionType: AuthActions.SIGNIN }));
  //     const date = new Date();
  //     setFormKey(String(date.getTime()));
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = changeFormKey();
      return unsubscribe;
    }, []),
  );

  const changeFormKey = () => {
    dispatch(resetCommonByTypeAction({ actionType: AuthActions.SIGNIN }));
    const date = new Date();
    const newFormKey = String(date.getTime());
    setFormKey(newFormKey);
  }

  React.useEffect(() => {
    if (token != null) {
      setUser(DEFAULT_SIGNIN_USER);
      navigation.navigate(Screen.TabNavigator);
    }
  }, [token]);

  React.useEffect(() => {
    if (token) {
      navigation.navigate(Screen.TabNavigator);
    }
  }, [token]);

  const onSignIn = (user: ISignInUser) => {
    dispatch(signinAction(user));
  };

  const onSignUp = () => {
    navigation.navigate(Screen.SignUp);
  };

  return (
    <LoginView
      key={formKey}
      user={user}
      onSignIn={onSignIn}
      onSignUp={onSignUp}
      disabled={!!loading}
      apiError={apiErrorMessage}
      apiFieldsErrors={apiFieldsErrors}
    />
  );
};

export default Login;
