import bgImg from 'assets/images/bg.png';
import { PhotoModal, SafeAreaBackground, ScreenHeader } from 'components/blocks';
import { PickerMultiple } from 'components/ui';
import { IDENTITY_OPTIONS } from 'constants/data';
import { ERROR_MSG as ERROR_MSG_DEF } from 'constants/errorMsg';
import STYLES from 'constants/styles';
import { FormikProps, withFormik } from 'formik';
import { AddPhotoIcon, ArrowLeftInCircleIcon, EditIcon } from 'icons';
import * as React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getApiErrorFieldMsg, maskPhone } from 'services/utils';
import styled from 'styled-components';
import { IFieldError, ISignUpUser, IUser, UserIdentityType } from 'types';

import {
  Button,
  FormApiError,
  InputAddress,
  InputMaterial,
  InputsDivider,
  InputsWrapper,
  Picker,
  PickerNative,
  Typography,
} from 'ui';
import * as yup from 'yup';

const WIDTH = Dimensions.get('window').width;

const ERROR_MSG = ERROR_MSG_DEF || {};

export const validationSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .required(ERROR_MSG.FIRST_NAME_REQUIRED),
  last_name: yup
    .string()
    .trim()
    .required(ERROR_MSG.LAST_NAME_REQUIRED),
  phone: yup
    .string()
    .trim()
    .required(ERROR_MSG.PHONE_REQUIRED),
  email: yup
    .string()
    .trim()
    .email(ERROR_MSG.EMAIL_NOT_VALID)
    .required(ERROR_MSG.EMAIL_REQUIRED),
  'address.main': yup.string().trim(),
  identity: yup
    .string()
    .trim()
    .required(ERROR_MSG.IDENTITY_REQUIRED),
  identityOther: yup
    .string()
    .trim()
    .test('identity-other', 'ENTER OTHER IDENTITY', function(value) {
      const isOther = this.parent.identity === UserIdentityType.OTHER;
      return isOther ? !!value : true;
    }),
});

interface IOwnProps {
  user: IUser;
  photo: Maybe<ImagePickerResponse>;
  onSubmit: (user: IUser, isEmailChanged: boolean) => void;
  onUploadImg: () => void;
  onPhotoModalSubmit: () => void;
  onPhotoModalClose: () => void;
  onBack: () => void;

  disabled?: boolean;
  apiError?: string;
  apiFieldsErrors?: IFieldError[];
}

interface IProfileUser extends IUser {
  identityOther: string;
  secondaryIdentities: string[];
}

type IProfileEditViewProps = IOwnProps & FormikProps<IProfileUser>;

const ProfileEditView = ({
  user,
  photo,
  onSubmit,
  onUploadImg,
  onPhotoModalSubmit,
  onPhotoModalClose,
  onBack,
  disabled,
  apiError,
  apiFieldsErrors,

  values,
  errors,
  touched,
  dirty,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
}: IProfileEditViewProps) => {
  const bgColor = STYLES.color.lightishPurple;

  const [isOtherIdentity, setIsOtherIdentity] = React.useState(false);

  const formatPhone = (str: string) => {
    let newStr = str.replace(/[^+\d]/g, '');
    newStr = maskPhone(newStr);
    return newStr;
  };

  const setValue = (type: string, propVal: string | string[]) => {
    let val = propVal;
    if (type === 'identity') {
      if (val === UserIdentityType.OTHER && !isOtherIdentity) {
        setIsOtherIdentity(true);
      } else if (isOtherIdentity) {
        setFieldValue('identityOther', '');
        setIsOtherIdentity(false);
      }
    }
    setFieldValue(type, val);
    setFieldTouched(type, true);
  };

  const isProfileImage = !!user.profile_image_url;
  const topImgSrc = isProfileImage ? { uri: user.profile_image_url } : bgImg;

  const secondaryIdentities = IDENTITY_OPTIONS.filter(
    val => val.value !== UserIdentityType.OTHER && val.value !== values.identity,
  );

  let errorFirstName = touched.first_name ? errors.first_name : '';
  errorFirstName = errorFirstName || getApiErrorFieldMsg(apiFieldsErrors, 'first_name');
  let errorLastName = touched.last_name ? errors.last_name : '';
  errorLastName = errorLastName || getApiErrorFieldMsg(apiFieldsErrors, 'last_name');
  let errorPhone = touched.phone ? errors.phone : '';
  errorPhone = errorPhone || getApiErrorFieldMsg(apiFieldsErrors, 'phone');
  let errorEmail = touched.email ? errors.email : '';
  errorEmail = errorEmail || getApiErrorFieldMsg(apiFieldsErrors, 'email');
  // @ts-ignore
  const isAddressTouched = !!touched.address && touched.address.main;
  let errorLocationAddress =
    isAddressTouched && !!values.address && !values.address.main ? ERROR_MSG.FIELD_REQUIRED : '';
  let errorIdentity = touched.identity ? errors.identity : '';
  errorIdentity = errorIdentity || getApiErrorFieldMsg(apiFieldsErrors, 'identity');
  const errorIdentityOther = touched.identityOther ? errors.identityOther : '';

  return (
    <SafeAreaBackground bgColor={bgColor}>
      <WrapperScrollable
        contentContainerStyle={{
          alignItems: 'flex-start',
          paddingHorizontal: 0,
          paddingTop: 0,
          minHeight: 200,
          paddingBottom: STYLES.size.bottomTabsHeight,
          margin: 0,
        }}
        style={{
          backgroundColor: 'transparent',
        }}
        keyboardShouldPersistTaps="always"
      >
        <ImageWrapper>
          <SafeAreaBackground bgImg={topImgSrc} bgColor={STYLES.color.lightishPurple}>
            <StyledScreenHeader
              bgColor="transparent"
              // title="Profile"
              SvgIcon={ArrowLeftInCircleIcon}
              // color={STYLES.color.white}
              onLeftPress={onBack}
              leftColor={STYLES.color.white}
            />

            {isProfileImage ? (
              <EditIconWrapper onPress={onUploadImg}>
                <EditIcon />
              </EditIconWrapper>
            ) : (
              <AddPhotoIconWrapper onPress={onUploadImg}>
                <AddPhotoIcon />
              </AddPhotoIconWrapper>
            )}
          </SafeAreaBackground>
        </ImageWrapper>
        <Wrapper>
          <Typography
            color={STYLES.color.white}
            fontSize={STYLES.fontSize.premedium}
            bold
            style={{ letterSpacing: -0.24, marginBottom: 12 }}
          >
            PERSONAL INFO:
          </Typography>
          <InputMaterial
            label="First name"
            value={values.first_name || ''}
            error={errorFirstName}
            onChangeText={(val: string) => setValue('first_name', val)}
          />

          <InputMaterial
            label="Last name"
            value={values.last_name || ''}
            error={errorLastName}
            onChangeText={(val: string) => setValue('last_name', val)}
          />

          <InputMaterial
            label="Phone number"
            value={maskPhone(values.phone || '')}
            error={errorPhone}
            keyboardType="phone-pad"
            onChangeText={(val: string) => setValue('phone', val)}
            formatText={formatPhone}
          />

          <InputMaterial
            label="Email"
            value={values.email || ''}
            error={errorEmail}
            keyboardType="email-address"
            onChangeText={(val: string) => setValue('email', val)}
          />

          <InputAddress
            label="Location"
            value={values.address ? values.address.main : ''}
            error={errorLocationAddress}
            onChangeText={(val: string) => setValue('address.main', val)}
          />

          {!isOtherIdentity ? (
            <Picker
              onValueChange={({ value }) => setValue('identity', value || '')}
              value={values.identity}
              items={IDENTITY_OPTIONS as any}
              error={errorIdentity}
              placeholder={'Creative Identity (Main)'}
            />
          ) : (
            <InputsWrapper>
              <Picker
                onValueChange={({ value }) => setValue('identity', value || '')}
                value={values.identity}
                items={IDENTITY_OPTIONS as any}
                error={errorIdentity}
                placeholder={'Creative Identity (Main)'}
              />
              <InputsDivider />
              <InputMaterial
                label="Other identity"
                value={values.identityOther}
                error={errorIdentityOther}
                onChangeText={(val: string) => setValue('identityOther', val)}
              />
            </InputsWrapper>
          )}

          <PickerMultiple
            label="Creative Identity (Secondaries)"
            items={secondaryIdentities}
            selectedValues={values.secondaryIdentities}
            onChange={(val: string[]) => setValue('secondaryIdentities', val)}
            style={{ marginTop: 16 }}
          />

          <FormApiError error={apiError} />

          <ButtonsContainer>
            <BottomBtnWrapper>
              <Button label="SUBMIT" onPress={handleSubmit} disabled={!dirty} />
            </BottomBtnWrapper>
          </ButtonsContainer>
        </Wrapper>
      </WrapperScrollable>
      {!!photo && (
        <PhotoModal
          photo={photo}
          onSubmit={onPhotoModalSubmit}
          onClose={onPhotoModalClose}
          disabled={disabled}
          apiError={apiError}
        />
      )}
    </SafeAreaBackground>
  );
};

const WrapperScrollable = styled(KeyboardAwareScrollView)`
  flex: 1;
  padding-bottom: ${STYLES.size.bottomTabsHeight + 16}px;
`;

const StyledScreenHeader = styled(ScreenHeader)`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const ImageWrapper = styled(View)`
  flex: 1;
  position: relative;
  width: 100%;
  height: ${WIDTH * 0.74}px;
  flex-direction: column;
  padding: 0;
`;

const AddPhotoIconWrapper = styled(TouchableOpacity)`
  align-self: center;
  width: 96px;
  height: 96px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const EditIconWrapper = styled(TouchableOpacity)`
  position: absolute;
  top: 130px;
  left: ${WIDTH / 2 - 24}px;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.3);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(View)`
  flex: 1;
  position: relative;
  width: 100%;
  flex-direction: column;
  padding: 16px;
  margin-top: -16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${STYLES.color.lightishPurple};
`;

const ButtonsContainer = styled(View)`
  flex: 1;
  width: 100%;
  padding: 0 15%;
  align-items: center;
  margin-top: 0;
`;

const BottomBtnWrapper = styled(View)`
  margin-top: 17px;
`;

export default withFormik<IOwnProps, IProfileUser>({
  mapPropsToValues({ user }) {
    const { metadata, ...rest } = user;
    return {
      ...rest,
      identityOther: '',
      secondaryIdentities: (metadata && metadata.secondaryIdentities) || [],
    };
  },
  validationSchema,
  validateOnChange: false,
  validateOnBlur: false,
  async handleSubmit(values, { props }) {
    const isEmailChanged = props.user.email !== values.email;
    const { identityOther, secondaryIdentities, ...user } = values;
    let newUser = { ...user };
    if (identityOther) {
      newUser.identity = identityOther;
    }
    newUser.metadata = {};
    newUser.metadata.secondaryIdentities = secondaryIdentities || [];
    props.onSubmit(newUser, isEmailChanged);
  },
  displayName: 'ProfileEditForm',
})(ProfileEditView);
