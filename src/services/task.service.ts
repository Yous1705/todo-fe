import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/type/api.type";
import { TaskDto } from "@/type/task.type";

export const taskService = {
  async create(todoId: number, payload: TaskDto): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post<ApiResponse<null>>(
      `task/${todoId}`,
      payload,
    );

    return response.data;
  },

  async update(taskId: number, payload: TaskDto): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(
      `task/${taskId}`,
      payload,
    );

    return response.data;
  },

  async start(taskId: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(
      `task/${taskId}/start`,
    );

    return response.data;
  },

  async pause(taskId: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(
      `task/${taskId}/pause`,
    );

    return response.data;
  },

  async complete(taskId: number, files?: File[]): Promise<ApiResponse<null>> {
    const formData = new FormData();

    files?.forEach((file) => {
      formData.append("images", file);
    });

    const response = await axiosInstance.patch<ApiResponse<null>>(
      `task/${taskId}/complete`,
      formData,
    );

    return response.data;
  },
};
