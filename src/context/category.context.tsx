"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { message } from "antd";
import { categoryService } from "@/services/category.service";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/type/category.type";

export interface CategoryContextType {
  categories: Category[];
  loading: boolean;

  fetchCategories: () => Promise<void>;

  createCategory: (payload: CreateCategoryDto) => Promise<boolean>;

  updateCategory: (
    categoryId: number,
    payload: UpdateCategoryDto,
  ) => Promise<boolean>;

  deleteCategory: (categoryId: number) => Promise<boolean>;
}

export const CategoryContext = createContext<CategoryContextType | null>(null);

interface CategoryProviderProps {
  children: ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await categoryService.getAll();

      setCategories(response.data);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Failed to fetch categories",
      );
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (
    payload: CreateCategoryDto,
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await categoryService.create(payload);

      message.success(response.message);

      await fetchCategories();

      return true;
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Failed to create category",
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (
    categoryId: number,
    payload: UpdateCategoryDto,
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await categoryService.update(categoryId, payload);

      message.success(response.message);

      await fetchCategories();

      return true;
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Failed to update category",
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId: number): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await categoryService.delete(categoryId);

      message.success(response.message);

      await fetchCategories();

      return true;
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Failed to delete category",
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
