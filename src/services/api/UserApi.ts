import { ImagePickerResponse } from 'react-native-image-picker';
import { ICode, IEmail, IUserEdit } from 'types/IUser';
import BaseApi, { ApiMethod } from './BaseApi';

export default class UserApi {
  constructor(baseApi: BaseApi) {
    this.baseApi = baseApi;
  }

  public baseApi: BaseApi;

  public getMyUser = () => this.baseApi.get('api/user/me', null);

  public verifyEmail = (value: ICode) => this.baseApi.post('api/user/me/verify_email', value);

  public resendVerifyEmail = () => this.baseApi.post('api/user/me/resend_verification_code', null);

  public updateUser = (value: IUserEdit) => this.baseApi.patch('api/user/me', value);

  public updateEmail = (value: IEmail) => this.baseApi.put('api/user/me/email', value);

  public updateProfileImage = (value: ImagePickerResponse) =>
    this.baseApi.uploadImageByXHR({
      url: 'api/user/me/profile_image',
      method: ApiMethod.POST,
      value,
    });

  // api/user/me/profile_image?mask=true&top=100&left=50&size=100
  public updateProfileImageWithMask = (value: any, top: number, left: number, size: number) =>
    this.baseApi.put(
      `api/user/me/profile_image?mask=true&top=${top}&left=${left}&size=${size}`,
      value,
    );
}
