import { FormikProps, withFormik } from 'formik';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { IFieldError } from 'types';
import * as yup from 'yup';

import SafeAreaBackground from 'components/blocks/SafeAreaBackground';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from 'constants/data';
import { ERROR_MSG as ERROR_MSG_DEF } from 'constants/errorMsg';
import STYLES from 'constants/styles';
import { getApiErrorFieldMsg, trimValues } from 'services/utils';
import styled from 'styled-components';
import { DEFAULT_SIGNIN_USER, ISignInUser } from 'types/IAuth';
import { Button, FormApiError, InputMaterial, LogoImage } from 'ui';

interface IOwnProps {
  user: ISignInUser;
  onSignIn: (user: ISignInUser) => void;
  onSignUp: () => void;

  disabled: boolean;
  apiError: string;
  apiFieldsErrors: IFieldError[];
}

type ILoginViewProps = IOwnProps & FormikProps<ISignInUser>;

const ERROR_MSG = ERROR_MSG_DEF || {};

export const yupSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(ERROR_MSG.EMAIL_NOT_VALID)
    .required(ERROR_MSG.EMAIL_REQUIRED),
  password: yup
    .string()
    .trim()
    .required(ERROR_MSG.PASSWORD_REQUIRED)
    .min(MIN_PASSWORD_LENGTH, ERROR_MSG.PASSWORD_NOT_VALID)
    .max(MAX_PASSWORD_LENGTH, ERROR_MSG.PASSWORD_NOT_VALID),
});

const LoginView = ({
  onSignIn,
  onSignUp,
  disabled,
  apiError,
  apiFieldsErrors,

  values,
  errors,
  touched,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
}: ILoginViewProps) => {
  const setValue = (type: string, val: string) => {
    setFieldValue(type, val);
    setFieldTouched(type, true);
  };

  let errorEmail = touched.email ? errors.email : '';
  errorEmail = errorEmail || getApiErrorFieldMsg(apiFieldsErrors, 'email');
  let errorPassword = touched.password ? errors.password : '';
  errorPassword = errorPassword || getApiErrorFieldMsg(apiFieldsErrors, 'password');

  return (
    <SafeAreaBackground>
      <WrapperScrollable
        contentContainerStyle={{
          alignItems: 'flex-start',
          paddingHorizontal: 20,
          paddingTop: 40,
          minHeight: 200,
          paddingBottom: 20,
        }}
        keyboardShouldPersistTaps="always"
      >
        <LogoContainer>
          <LogoImage />
        </LogoContainer>

        <TitleContainer>
          <TitleText>SOME TITLE</TitleText>
        </TitleContainer>

        <InputMaterial
          label="Email"
          value={values.email}
          error={errorEmail}
          keyboardType="email-address"
          onChangeText={(val: string) => setValue('email', val)}
        />

        <InputMaterial
          label="Password"
          secureTextEntry
          value={values.password}
          error={errorPassword}
          onChangeText={(val: string) => setValue('password', val)}
        />

        <FormApiError error={apiError} />

        <ButtonsContainer>
          <Button label="SIGN IN" onPress={handleSubmit} />
          <JoinWrapper>
            <Button label="JOIN" onPress={onSignUp} hasBorder={false} />
          </JoinWrapper>
        </ButtonsContainer>
      </WrapperScrollable>
    </SafeAreaBackground>
  );
};

const WrapperScrollable = styled(ScrollView)`
  flex: 1;
`;

const LogoContainer = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const TitleContainer = styled(View)`
  flex: 1;
  width: 100%;
  margin-top: 28px;
  margin-bottom: 28px;
  justify-content: flex-start;
  align-items: center;
`;

const TitleText = styled(Text)`
  font-family: ${STYLES.fontFamily.bold};
  font-size: ${STYLES.fontSize.large}px;
  color: ${STYLES.color.white};
`;

const ButtonsContainer = styled(View)`
  flex: 1;
  width: 100%;
  padding: 0 15%;
  align-items: center;
  margin-top: 8px;
`;

const JoinWrapper = styled(View)`
  margin-top: 17px;
`;

export default withFormik<IOwnProps, ISignInUser>({
  mapPropsToValues({ user }) {
    return user;
    // return {
    //   email: 'test@igodev.com',
    //   password: 'password',
    // };
    // return {
    //   email: 'demo@igodev.com',
    //   password: 'Password1',
    // };
  },
  validationSchema: yupSchema,
  validateOnChange: true,
  async handleSubmit(values, { props }) {
    props.onSignIn(trimValues(values, Object.getOwnPropertyNames(DEFAULT_SIGNIN_USER)));
  },
  displayName: 'LoginForm',
})(LoginView);
