"use client";

import { taskService } from "@/services/task.service";
import { todoService } from "@/services/todo.service";
import { TaskDto, TodoTaskQuery } from "@/type/task.type";
import { Todo } from "@/type/todo.type";
import { createContext, ReactNode, useEffect, useState } from "react";

interface TaskContextType {
  todo: Todo | undefined;
  loading: boolean;
  error: string | null;
  query: TodoTaskQuery;
  setQuery: React.Dispatch<React.SetStateAction<TodoTaskQuery>>;
  fetchTodoDetail: (todoId: number) => Promise<void>;
  createTask: (todoId: number, payload: TaskDto) => Promise<void>;
  updateTask: (
    todoId: number,
    taskId: number,
    payload: TaskDto,
  ) => Promise<void>;
  completeTask: (
    todoId: number,
    taskId: number,
    files: File[],
  ) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [todo, setTodo] = useState<Todo>();
  const [query, setQuery] = useState<TodoTaskQuery>({
    sort: "newest",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodoDetail = async (todoId: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await todoService.findOne(todoId, query);

      setTodo(response.data);
    } catch (error) {
      setError("Failed to fetch tasks");
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (
    todoId: number,
    payload: TaskDto,
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await taskService.create(todoId, payload);
      await fetchTodoDetail(todoId);
    } catch (error) {
      setError("Failed to create task");
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (
    todoId: number,
    taskId: number,
    payload: TaskDto,
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await taskService.update(taskId, payload);
      await fetchTodoDetail(todoId);
    } catch (error) {
      setError("Failed to update task");
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (
    todoId: number,
    taskId: number,
    files: File[],
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await taskService.complete(taskId, files);

      await fetchTodoDetail(todoId);
    } catch (error) {
      setError("Failed to complete task");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        todo,
        loading,
        error,
        query,
        setQuery,
        fetchTodoDetail,
        createTask,
        updateTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
