import { CategoryContext } from "@/context/category.context";
import { useContext } from "react";

export function useCategory() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within CategoryProvider");
  }

  return context;
}
