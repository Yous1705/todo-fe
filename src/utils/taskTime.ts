import type { TaskList } from "@/type/task.type";

export const calculateDuration = (task: TaskList, tick: number) => {
  let seconds = task.totalDuration;

  if (task.isRunning && task.currentStartedAt) {
    const runningSeconds = Math.floor(
      (tick - new Date(task.currentStartedAt).getTime()) / 1000,
    );

    seconds += runningSeconds;
  }

  return seconds;
};

export const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  return `${remainingSeconds}s`;
};
