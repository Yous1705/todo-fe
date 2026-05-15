import axiosInstance from "@/lib/axios";
import { ApiResponse, PaginatedResponse } from "@/type/pagination.type";
import {
  GetTodosParams,
  SearchTodoParams,
  Todo,
  TodoDto,
} from "@/type/todo.type";

export const todoService = {
  async getAll(params?: GetTodosParams): Promise<PaginatedResponse<Todo>> {
    const response = await axiosInstance.get<
      ApiResponse<PaginatedResponse<Todo>>
    >("todo", {
      params,
    });

    return response.data.data;
  },

  async search(params: SearchTodoParams): Promise<Todo[]> {
    const response = await axiosInstance.get<ApiResponse<Todo[]>>(
      "/todo/search",
      {
        params,
      },
    );

    return response.data.data;
  },

  async create(dto: TodoDto): Promise<Todo> {
    const response = await axiosInstance.post<ApiResponse<Todo>>("todo", dto);

    return response.data.data;
  },

  async update(id: number, dto: TodoDto): Promise<Todo> {
    const response = await axiosInstance.patch<ApiResponse<Todo>>(
      `todo/${id}`,
      dto,
    );

    return response.data.data;
  },

  async delete(id: number): Promise<Todo> {
    const response = await axiosInstance.delete<ApiResponse<Todo>>(
      `todo/${id}`,
    );

    return response.data.data;
  },
};
