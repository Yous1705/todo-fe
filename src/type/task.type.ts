import { type } from "node:os";

export interface TaskList {
  id: number;
  todoId: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
  isRunning: boolean;
  currentStartedAt?: string | null;
  totalDuration: number;
  completedAt?: string | null;
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

export interface TodoTaskQuery {
  search?: string;
  status?: "INCOMPLETE" | "COMPLETED";
  sort?: "newest" | "oldest" | "alphabetical";
}
