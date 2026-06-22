export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterResponse {
  user: User;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}
