export interface TaskList {
  id: number;
  todoId: number;
  title: string;
  taskImages: TaskImages[];
}

export interface TaskImages {
  id: number;
  url: string;
  taskId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskDto {
  title: string;
}

export interface CompleteTask {
  taskId: number;
  images?: File[];
}
