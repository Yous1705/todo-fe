"use client";

import { categoryService } from "@/services/category.service";
import { taskService } from "@/services/task.service";
import { todoService } from "@/services/todo.service";
import { PaginationMeta } from "@/type/api.type";
import { SearchTodoParams, Statistics, Todo, TodoDto } from "@/type/todo.type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppToast } from "@/component/AntdAppProvider";

interface TodoContextType {
  todo: Todo[];
  stats: Statistics | null;
  meta: PaginationMeta | null;
  loading: boolean;
  error: string | null;

  page: number;
  limit: number;

  fetchTodo: (page?: number, limit?: number) => Promise<void>;
  fetchTodosByCategory: (categoryId: number) => Promise<void>;

  fetchStatistics: () => Promise<void>;

  createTodo: (todo: TodoDto, files?: File[]) => Promise<void>;
  updateTodo: (id: number, todo: Partial<TodoDto>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;

  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  searchTodos: (params: SearchTodoParams) => Promise<void>;
  clearSearch: () => void;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [task, setTask] = useState<Todo>();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useAppToast();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchTodo = async (currentPage = page, currentLimit = limit) => {
    try {
      setLoading(true);
      setError(null);

      const result = await todoService.getAll({
        page: currentPage,
        limit: currentLimit,
      });

      setTodo(result.data);
      setMeta(result.meta);
    } catch (error) {
      setError("faild to fetch Todo");
      console.log("error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await todoService.getStats();

      setStats(result.data);
    } catch (error) {
      setError("Failed to fetch tasks");
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTask = async (todoId: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await todoService.findOne(todoId);

      setTask(response.data);
    } catch (error) {
      setError("Failed to fetch tasks");
      console.log("error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const searchTodos = async (params: SearchTodoParams) => {
    try {
      setLoading(true);
      setError(null);

      const result = await todoService.search(params);

      setTodo(result);
      setMeta(null);
    } catch (err) {
      setError("Failed to search todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodosByCategory = async (categoryId: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await categoryService.getTodosByCategory<Todo>(categoryId);

      setTodo(response.data);
      setMeta(null); // karena endpoint ini tidak mengembalikan pagination
    } catch (error) {
      setError("Failed to fetch todos by category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = async () => {
    setSearchKeyword("");
    await fetchTodo(1, limit);
  };

  const createTodo = async (todo: TodoDto, files?: File[]) => {
    try {
      await todoService.create(todo, files);
      await fetchTodo();
      toast?.showToast("Todo created successfully", "success");
    } catch (error: any) {
      toast?.showToast(
        error?.response?.data?.message || "Failed to create todo",
        "error",
      );
      throw error;
    }
  };

  const updateTodo = async (id: number, todo: Partial<TodoDto>) => {
    try {
      await todoService.update(id, todo);
      await fetchTodo();
      toast?.showToast("Todo updated successfully", "success");
    } catch (error: any) {
      toast?.showToast(
        error?.response?.data?.message || "Failed to update todo",
        "error",
      );
      throw error;
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoService.delete(id);
      await fetchTodo();
      toast?.showToast("Todo deleted successfully", "success");
    } catch (error: any) {
      toast?.showToast(
        error?.response?.data?.message || "Failed to delete todo",
        "error",
      );
      throw error;
    }
  };

  useEffect(() => {
    if (!searchKeyword) {
      fetchTodo(page, limit);
    }
  }, [page, limit, searchKeyword]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todo,
        meta,
        stats,
        loading,
        error,
        page,
        limit,
        searchKeyword,
        fetchTodo,
        fetchStatistics,
        fetchTodosByCategory,
        createTodo,
        updateTodo,
        deleteTodo,
        searchTodos,
        clearSearch,
        setPage,
        setLimit,
        setSearchKeyword,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
