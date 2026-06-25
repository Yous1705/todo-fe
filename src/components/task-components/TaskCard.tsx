import React, { useMemo } from "react";
import { Button, Image, Space, Tag } from "antd";
import {
  EditOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import type { TaskList } from "@/type/task.type";
import { calculateDuration, formatDuration } from "../../utils/taskTime";

interface TaskCardProps {
  task: TaskList;
  tick: number;
  onEdit: (task: TaskList) => void;
  onComplete: (task: TaskList) => void;
  onStart: (task: TaskList) => void;
  onPause: (task: TaskList) => void;
}

export default function TaskCard({
  task,
  tick,
  onEdit,
  onComplete,
  onStart,
  onPause,
}: TaskCardProps) {
  const isCompleted = task.status === "COMPLETED";

  const durationLabel = useMemo(
    () => formatDuration(calculateDuration(task, tick)),
    [task, tick],
  );

  const tagConfig = useMemo(() => {
    if (isCompleted) {
      return {
        border: "border-emerald-500/10 hover:border-emerald-500/20",
        color: "green",
        label: "Completed",
      };
    }

    if (task.isRunning) {
      return {
        border: "border-blue-500/20 hover:border-blue-500/30",
        color: "processing" as const,
        label: "Running",
      };
    }

    return {
      border: "border-[#2D3139] hover:border-slate-500/20",
      color: "blue",
      label: "Pending",
    };
  }, [isCompleted, task.isRunning]);

  return (
    <div
      className={`bg-[#23272F] border ${tagConfig.border} rounded-xl p-5 sm:p-6 transition-all duration-300 relative group`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="space-y-3 flex-1 w-full">
          <div className="flex items-center gap-2">
            <Tag
              color={tagConfig.color}
              className="font-bold uppercase tracking-wider text-[10px] px-2 rounded"
            >
              {tagConfig.label}
            </Tag>
            <span className="text-xs text-[#B0BEC5]/40 font-mono">
              ID: #{task.id}
            </span>
          </div>

          <h3
            className={`text-base sm:text-lg font-bold tracking-tight text-white ${
              isCompleted ? "line-through text-white/30" : ""
            }`}
          >
            {task.title}
          </h3>

          <p
            className={`text-sm leading-relaxed ${
              isCompleted ? "text-[#B0BEC5]/30" : "text-[#B0BEC5]"
            }`}
          >
            {task.description}
          </p>

          <div className="flex items-center space-x-2 pt-1 text-xs text-[#B0BEC5]/70">
            <span className="font-semibold text-white/70">Time Spent:</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                task.isRunning
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-[#181A20] text-[#B0BEC5]"
              }`}
            >
              {durationLabel}
            </span>
          </div>

          {task.taskImages && task.taskImages.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
                <Image.PreviewGroup>
                  {task.taskImages.map((image) => (
                    <div
                      key={image.id}
                      className="w-16 h-16 rounded-lg overflow-hidden border border-[#2D3139] hover:border-[#1976D2] transition cursor-zoom-in"
                    >
                      <Image
                        src={image.url}
                        alt="evidence"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </Image.PreviewGroup>
              </div>
            </div>
          )}
        </div>

        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start w-full md:w-auto border-t border-[#2D3139]/40 md:border-none pt-3 md:pt-0 gap-3 flex-shrink-0">
          <Space wrap>
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(task)}
              className="bg-[#2D3139] border-[#2D3139] text-[#B0BEC5] hover:text-white"
            >
              Edit
            </Button>

            {!isCompleted && (
              <Button
                size="small"
                type="primary"
                onClick={() => onComplete(task)}
                className="bg-emerald-600 hover:bg-emerald-500 border-none font-semibold text-xs"
              >
                Complete
              </Button>
            )}

            {!isCompleted && !task.isRunning && (
              <Button
                size="small"
                icon={<PlayCircleOutlined />}
                onClick={() => onStart(task)}
                className="bg-blue-600/10 text-blue-400 border-blue-500/20"
              >
                Start
              </Button>
            )}

            {!isCompleted && task.isRunning && (
              <Button
                size="small"
                danger
                icon={<PauseCircleOutlined />}
                onClick={() => onPause(task)}
                className="bg-red-500/10 border-red-500/20 text-[#EF5350]"
              >
                Pause
              </Button>
            )}
          </Space>
        </div>
      </div>
    </div>
  );
}
