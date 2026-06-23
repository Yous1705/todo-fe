import { type } from "node:os";

export interface TaskList {
  id: number;
  todoId: number;
  title: string;
  status: TaskStatusEnum;
  description: string;
  taskImages: TaskImages[];
}

export type TaskStatusEnum = "INCOMPLETE" | "COMPLETED";

export interface TaskImages {
  id: number;
  url: string;
  taskId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskDto {
  title: string;
  description: string;
}

export interface CompleteTask {
  taskId: number;
  images?: File[];
}
