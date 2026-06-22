import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/type/api.type";
import {
  LoginDto,
  LoginResponse,
  RegisterDto,
  RegisterResponse,
} from "@/type/auth.type";

export const authService = {
  async register(payload: RegisterDto): Promise<ApiResponse<RegisterResponse>> {
    const response = await axiosInstance.post<ApiResponse<RegisterResponse>>(
      "auth/register",
      payload,
    );

    return response.data;
  },

  async login(payload: LoginDto): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      "auth/login",
      payload,
    );

    return response.data;
  },
};
