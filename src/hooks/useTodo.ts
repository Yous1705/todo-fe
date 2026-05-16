import { TodoContext } from "@/context/todo.context";
import { useContext } from "react";

export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useCategory must be used within CategoryProvider");
  }

  return context;
}
