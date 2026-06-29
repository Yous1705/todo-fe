"use client";

import { taskService } from "@/services/task.service";
import { todoService } from "@/services/todo.service";
import { TaskDto, TodoTaskQuery } from "@/type/task.type";
import { Todo } from "@/type/todo.type";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppToast } from "@/component/AntdAppProvider";

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
  startTask: (todoId: number, taskId: number) => Promise<void>;
  pauseTask: (todoId: number, taskId: number) => Promise<void>;
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
  const toast = useAppToast();

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
      toast?.showToast("Task created successfully", "success");
    } catch (error: any) {
      setError("Failed to create task");
      toast?.showToast(
        error?.response?.data?.message || "Failed to create task",
        "error",
      );
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
      toast?.showToast("Task updated successfully", "success");
    } catch (error: any) {
      setError("Failed to update task");
      toast?.showToast(
        error?.response?.data?.message || "Failed to update task",
        "error",
      );
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
      toast?.showToast("Task completed successfully", "success");
    } catch (error: any) {
      setError("Failed to complete task");
      toast?.showToast(
        error?.response?.data?.message || "Failed to complete task",
        "error",
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const startTask = async (todoId: number, taskId: number): Promise<void> => {
    try {
      await taskService.start(taskId);

      // Optimistic update supaya tidak terlihat "reload" akibat refetch.
      // Tambahkan baseline waktu agar `time spent` tetap bertambah realtime.
      setTodo((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          task: prev.task.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  isRunning: true,
                  currentStartedAt: new Date().toISOString(),
                }
              : t,
          ),
        };
      });
    } catch (error: any) {
      setError("Failed to start task");
      toast?.showToast(
        error?.response?.data?.message || "Failed to start task",
        "error",
      );
      console.log("error:", error);
    }
  };

  const pauseTask = async (todoId: number, taskId: number): Promise<void> => {
    try {
      await taskService.pause(taskId);

      // Optimistic update: saat pause, freeze totalDuration agar start berikutnya
      // melanjutkan dari waktu sebelumnya.
      // calculateDuration memakai: totalDuration + (tick - currentStartedAt).
      // Jadi sebelum menghapus currentStartedAt, kita akumulasi seconds yang sudah berjalan.
      const now = Date.now();

      setTodo((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          task: prev.task.map((t) => {
            if (t.id !== taskId) return t;
            if (!t.currentStartedAt) {
              return {
                ...t,
                isRunning: false,
                currentStartedAt: null,
              };
            }

            const runningSeconds = Math.floor(
              (now - new Date(t.currentStartedAt).getTime()) / 1000,
            );

            return {
              ...t,
              isRunning: false,
              // akumulasi ke totalDuration
              totalDuration: t.totalDuration + runningSeconds,
              currentStartedAt: null,
            };
          }),
        };
      });
    } catch (error: any) {
      setError("Failed to pause task");
      toast?.showToast(
        error?.response?.data?.message || "Failed to pause task",
        "error",
      );
      console.log("error:", error);
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
        startTask,
        pauseTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
