import axiosInstance from "@/lib/axios";
import { Category } from "@/type/category.type";
import { ApiResponse } from "@/type/pagination.type";

export const categoryService = {
  async getAll() {
    const response =
      await axiosInstance.get<ApiResponse<Category[]>>("category");

    return response.data.data;
  },
};
