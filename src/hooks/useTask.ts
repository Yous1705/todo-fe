import { TaskContext } from "@/context/task.context";
import { useContext } from "react";

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within TaskProvider");
  }

  return context;
}
