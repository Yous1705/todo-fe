"use client";

import { Category } from "@/type/category.type";

interface CategoryContextType {
  category: Category[];
  setCategory: (category: Category[]) => void;
}
