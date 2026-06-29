import { Dayjs } from "dayjs";
import { TaskList } from "./task.type";
export interface Todo {
  id: number;
  title: string;
  description: string;
  status: "INCOMPLETE" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  due_date: Dayjs | undefined;

  category: {
    id: number;
    name: string;
    color: string;
  };

  images: TodoImage[];
  task: TaskList[];
}

export interface GetTodosParams {
  page?: number;
  limit?: number;
}

export type StatusEnum = "INCOMPLETE" | "COMPLETED";
export type PriorityEnum = "LOW" | "MEDIUM" | "HIGH";

export type TodoDto = {
  title: string;
  description: string;
  status: StatusEnum;
  priority: PriorityEnum;
  due_date: string;
  categoryId: number;
  images?: File[];
};

export interface SearchTodoParams {
  title?: string;
  status?: StatusEnum;
  priority?: PriorityEnum;
}

export interface TodoImage {
  id: number;
  url: string;
  todoId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Statistics {
  totalTodo: number;
  totalTask: number;
  completedTask: number;
  pendingTask: number;
}
