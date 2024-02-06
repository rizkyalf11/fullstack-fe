import { BaseResponseSuccess } from "@/lib/axiosClient";

interface User {
  id?: number;
  nama: string;
  email: string;
  password: string;
  access_token: string;
  refresh_token: string;
}

export interface RegisterPayload extends Pick<User, 'nama' | 'email' | 'password'> {}

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