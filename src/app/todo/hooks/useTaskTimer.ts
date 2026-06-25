"use client";

import { useEffect, useMemo, useState } from "react";
import type { TaskList } from "@/type/task.type";

export function useTaskTimer(tasks?: TaskList[]) {
  const [tick, setTick] = useState(Date.now());

  const hasRunningTask = useMemo(
    () =>
      (tasks ?? []).some(
        (task) => task.isRunning && task.status !== "COMPLETED",
      ),
    [tasks],
  );

  useEffect(() => {
    if (!hasRunningTask) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTick(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [hasRunningTask]);

  return tick;
}
