import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/type/api.type";
import { LoginDto, LoginResponse, RegisterDto } from "@/type/auth.type";

export const authService = {
  async register(payload: RegisterDto): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post<ApiResponse<null>>(
      "auth/register",
      payload,
    );

    return response.data;
  },

  async login(payload: LoginDto): Promise<ApiResponse<LoginResponse>> {
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
      "auth/login",
      payload,
    );

    return response.data;
  },
};
