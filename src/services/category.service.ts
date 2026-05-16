import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/type/api.type";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/type/category.type";

export const categoryService = {
  async getAll(): Promise<ApiResponse<Category[]>> {
    const response =
      await axiosInstance.get<ApiResponse<Category[]>>("category");

    return response.data;
  },

  async getTodosByCategory<T = any>(
    categoryId: number,
  ): Promise<ApiResponse<T[]>> {
    const response = await axiosInstance.get<ApiResponse<T[]>>(
      `category/${categoryId}/todos`,
    );

    return response.data;
  },

  async create(payload: CreateCategoryDto): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post<ApiResponse<null>>(
      "category",
      payload,
    );

    return response.data;
  },

  async update(
    categoryId: number,
    payload: UpdateCategoryDto,
  ): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(
      `category/${categoryId}`,
      payload,
    );

    return response.data;
  },

  async delete(categoryId: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(
      `category/${categoryId}`,
    );

    return response.data;
  },
};
