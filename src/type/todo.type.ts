import { Dayjs } from "dayjs";
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
  due_date: Dayjs;
  categoryId: number;
};

export interface SearchTodoParams {
  title?: string;
  status?: StatusEnum;
  priority?: PriorityEnum;
}
