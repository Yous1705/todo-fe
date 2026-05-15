"use client";

import { todoService } from "@/services/todo.service";
import { PaginationMeta } from "@/type/pagination.type";
import { SearchTodoParams, Todo, TodoDto } from "@/type/todo.type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TodoContextType {
  todo: Todo[];
  meta: PaginationMeta | null;
  loading: boolean;
  error: string | null;

  page: number;
  limit: number;

  fetchTodo: (page?: number, limit?: number) => Promise<void>;
  createTodo: (todo: TodoDto) => Promise<void>;
  updateTodo: (id: number, todo: Partial<TodoDto>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;

  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  searchTodos: (params: SearchTodoParams) => Promise<void>;
  clearSearch: () => void;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const clearSearch = async () => {
    setSearchKeyword("");
    await fetchTodo(1, limit);
  };

  const createTodo = async (todo: TodoDto) => {
    await todoService.create(todo);
    await fetchTodo();
  };

  const updateTodo = async (id: number, todo: Partial<TodoDto>) => {
    await todoService.update(id, todo);
    await fetchTodo();
  };

  const deleteTodo = async (id: number) => {
    await todoService.delete(id);
    await fetchTodo();
  };

  useEffect(() => {
    if (!searchKeyword) {
      fetchTodo(page, limit);
    }
  }, [page, limit, searchKeyword]);

  return (
    <TodoContext.Provider
      value={{
        todo,
        meta,
        loading,
        error,
        page,
        limit,
        searchKeyword,
        fetchTodo,
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

export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }

  return context;
}
