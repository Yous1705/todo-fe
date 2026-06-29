"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { categoryService } from "@/services/category.service";
import { useAppToast } from "@/component/AntdAppProvider";
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
  const toast = useAppToast();

  const fetchCategories = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await categoryService.getAll();

      setCategories(response.data);
    } catch (error: any) {
      toast?.showToast(
        error?.response?.data?.message || "Failed to fetch categories",
        "error",
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

      toast?.showToast(response.message, "success");

      await fetchCategories();

      return true;
    } catch (error: any) {
      toast?.showToast(
        error?.response?.data?.message || "Failed to create category",
        "error",
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

      toast?.showToast(response.message, "success");

      await fetchCategories();

      return true;
    } catch (error: any) {
      toast?.showToast(
        error?.response?.data?.message || "Failed to update category",
        "error",
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

      toast?.showToast(response.message, "success");

      await fetchCategories();

      return true;
    } catch (error: any) {
      toast?.showToast(
        error?.response?.data?.message || "Failed to delete category",
        "error",
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
