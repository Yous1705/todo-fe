import React from "react";
import dayjs from "dayjs";
import { Tag } from "antd";
import { CalendarOutlined, FolderOpenOutlined } from "@ant-design/icons";
import type { Todo } from "@/type/todo.type";

interface TodoDetailCardProps {
  todo?: Todo;
  stats: {
    total: number;
    completed: number;
    active: number;
    idle: number;
    percentage: number;
    motivation: string;
    motivationColor: string;
  };
}

export default function TodoDetailCard({ todo, stats }: TodoDetailCardProps) {
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-[#2D3139] bg-gradient-to-br from-[#23272F] to-[#1E2127] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1976D2]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <Tag
              color="blue"
              className="px-2.5 py-0.5 font-bold uppercase tracking-wider bg-blue-500/10 border-blue-500/20 text-blue-400"
            >
              {todo?.status}
            </Tag>
            <Tag
              color="orange"
              className="px-2.5 py-0.5 font-bold uppercase tracking-wider bg-orange-500/10 border-orange-500/20 text-orange-400"
            >
              {todo?.priority}
            </Tag>
            {todo?.category?.name && (
              <Tag
                color="green"
                className="px-2.5 py-0.5 font-bold uppercase tracking-wider bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              >
                📁 {todo.category.name}
              </Tag>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
            {todo?.title}
          </h1>

          <p className="text-[#B0BEC5] text-sm sm:text-base leading-relaxed">
            {todo?.description}
          </p>

          <div className="flex items-center space-x-2 text-xs text-[#B0BEC5] pt-2 border-t border-[#2D3139]/30">
            <CalendarOutlined className="text-blue-400" />
            <span className="font-bold text-white">Due Date:</span>
            <span>
              {todo?.due_date
                ? dayjs(todo.due_date).format("DD MMM YYYY")
                : "No Date"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#23272F] border border-[#2D3139] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B0BEC5]">
              System Health
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 py-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="#2D3139"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="url(#canvasGlow)"
                  strokeWidth="8"
                  strokeDasharray={263.89}
                  strokeDashoffset={263.89 - (263.89 * stats.percentage) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient
                    id="canvasGlow"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1976D2" />
                    <stop offset="100%" stopColor="#64B5F6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black font-mono text-white">
                  {stats.percentage}%
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#B0BEC5]/70">
                  Done
                </span>
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <span className="text-[10px] text-[#B0BEC5] uppercase tracking-wide font-bold">
                Milestone
              </span>
              <h3
                className={`text-xs sm:text-sm font-extrabold leading-snug ${stats.motivationColor}`}
              >
                {stats.motivation}
              </h3>
            </div>
          </div>

          <div className="pt-3 border-t border-[#2D3139]/40">
            <div className="flex justify-between text-xs text-[#B0BEC5] mb-1.5">
              <span>Scope Progress</span>
              <span className="font-mono">
                {stats.completed} / {stats.total} resolved
              </span>
            </div>
            <div className="w-full bg-[#181A20] h-1 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1976D2] to-[#64B5F6] h-full rounded-full transition-all duration-1000"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-[#23272F] border border-[#2D3139] rounded-2xl p-5 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <span className="text-xs text-[#B0BEC5] font-bold uppercase tracking-wider">
                Total Tasks
              </span>
              <FolderOpenOutlined className="text-blue-400 text-sm" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-mono mt-3">
                {stats.total}
              </h2>
              <p className="text-[11px] text-[#B0BEC5]/50 mt-0.5">
                Allocated items in scope
              </p>
            </div>
          </div>

          <div className="bg-[#23272F] border border-[#2D3139] rounded-2xl p-5 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <span className="text-xs text-[#B0BEC5] font-bold uppercase tracking-wider">
                Completed
              </span>
              <Tag
                color="green"
                className="text-emerald-400 text-sm p-0 bg-transparent border-none"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#4CAF50] font-mono mt-3">
                {stats.completed}
              </h2>
              <p className="text-[11px] text-[#B0BEC5]/50 mt-0.5">
                Archived successfully
              </p>
            </div>
          </div>

          <div className="bg-[#23272F] border border-[#2D3139] rounded-2xl p-5 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <span className="text-xs text-[#B0BEC5] font-bold uppercase tracking-wider">
                In Progress
              </span>
              <Tag
                color="blue"
                className="text-amber-400 text-sm p-0 bg-transparent border-none"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#FFA726] font-mono mt-3">
                {stats.active}
              </h2>
              <p className="text-[11px] text-[#B0BEC5]/50 mt-0.5">
                Active runtime clocks
              </p>
            </div>
          </div>

          <div className="bg-[#23272F] border border-[#2D3139] rounded-2xl p-5 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <span className="text-xs text-[#B0BEC5] font-bold uppercase tracking-wider">
                Pending
              </span>
              <Tag
                color="default"
                className="text-slate-400 text-sm p-0 bg-transparent border-none"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-400 font-mono mt-3">
                {stats.idle}
              </h2>
              <p className="text-[11px] text-[#B0BEC5]/50 mt-0.5">
                Idle waiting backlog
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
