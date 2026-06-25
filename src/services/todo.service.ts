import axiosInstance from "@/lib/axios";
import { ApiResponse, PaginatedResponse } from "@/type/api.type";
import { TodoTaskQuery } from "@/type/task.type";
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

  async findOne(todoId: number, query?: TodoTaskQuery) {
    const response = await axiosInstance.get(`todo/${todoId}`, {
      params: query,
    });

    return response.data;
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

  async create(dto: TodoDto, files?: File[]): Promise<Todo> {
    const formData = new FormData();

    formData.append("title", dto.title);
    formData.append("description", dto.description);
    formData.append("priority", dto.priority);
    formData.append("status", dto.status);
    formData.append("categoryId", dto.categoryId.toString());

    if (dto.due_date) {
      formData.append("due_date", dto.due_date.toString());
    }

    files?.forEach((file) => {
      formData.append("images", file);
    });

    const response = await axiosInstance.post<ApiResponse<Todo>>(
      "todo",
      formData,
    );

    return response.data.data;
  },

  async update(id: number, dto: Partial<TodoDto>): Promise<Todo> {
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
