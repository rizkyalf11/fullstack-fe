import { BaseResponseSuccess } from "@/lib/axiosClient";

interface User {
  id?: number;
  nama: string;
  email: string;
  password: string;
  access_token: string;
  refresh_token: string;
  role: string;
  avatar: string;
}

export interface RegisterPayload extends Pick<User, 'nama' | 'email' | 'password'> {}

export interface UpdateProfile extends Pick<User, 'nama' | 'avatar' | 'id'> {
  file?: File
}

export interface RegisterRespose extends BaseResponseSuccess {}

export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}

export interface LoginPayload extends Pick<User, "email" | "password"> {}

export interface LupaPwPayload extends Pick<User, "email"> {}

export interface ResetPwPayload {
  new_password: string
}

export interface ProfileResponse extends BaseResponseSuccess {
  data: User;
}