import React from "react";
import { Card, Button } from "antd";
import {
  Plus,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Statistics, Todo } from "@/type/todo.type";

interface DashboardHeaderProps {
  showCategories: boolean;
  setShowCategories: (show: boolean) => void;
  setOpenCreate: (open: boolean) => void;
  stats: Statistics | null;
}

export default function DashboardHeader({
  showCategories,
  setShowCategories,
  setOpenCreate,
  stats,
}: DashboardHeaderProps) {
  return (
    <Card
      className="border-slate-800/60 bg-[#151D30] shadow-xl overflow-hidden"
      styles={{ body: { padding: "2rem" } }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 m-0">
            Todo List Dashboard
          </h1>
          <p className="text-slate-400 text-sm sm:text-base m-0">
            Organize tasks, manage priorities, and stay productive with a clean
            dark overview.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <Button
            type="primary"
            size="large"
            icon={<Plus className="w-4 h-4" />}
            className="bg-blue-600 hover:bg-blue-700 border-none rounded-xl font-semibold shadow-md flex items-center"
            onClick={() => setOpenCreate(true)}
          >
            Add New Task
          </Button>

          <Button
            size="large"
            icon={
              showCategories ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )
            }
            className="rounded-xl font-semibold bg-[#1E293B] border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 flex items-center"
            onClick={() => setShowCategories(!showCategories)}
          >
            {showCategories ? "Hide Categories" : "Manage Categories"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className="border-[#1E293B] shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-[#131C31]/90"
          styles={{ body: { padding: "1.25rem" } }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider m-0">
                Total Tugas
              </p>
              <p className="text-2xl font-black text-white m-0 mt-0.5">
                {stats?.totalTodo || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card
          className="border-[#1E293B] shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-[#131C31]/90"
          styles={{ body: { padding: "1.25rem" } }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider m-0">
                Selesai
              </p>
              <p className="text-2xl font-black text-white m-0 mt-0.5">
                {stats?.completedTask || 0}{" "}
                <span className="text-xs text-slate-400 font-normal">
                  / {stats?.totalTask || 0}
                </span>
              </p>
            </div>
          </div>
        </Card>

        <Card
          className="border-[#1E293B] shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-[#131C31]/90"
          styles={{ body: { padding: "1.25rem" } }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider m-0">
                Sedang Berjalan
              </p>
              <p className="text-2xl font-black text-white m-0 mt-0.5">
                {stats?.pendingTask || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}
