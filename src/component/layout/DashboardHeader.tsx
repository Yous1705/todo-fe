import React from "react";
import { Card, Button } from "antd";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";

interface DashboardHeaderProps {
  showCategories: boolean;
  setShowCategories: (show: boolean) => void;
  setOpenCreate: (open: boolean) => void;
}

export default function DashboardHeader({
  showCategories,
  setShowCategories,
  setOpenCreate,
}: DashboardHeaderProps) {
  return (
    <Card
      className="border-slate-200/80 shadow-sm overflow-hidden"
      styles={{ body: { padding: "2rem" } }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 m-0">
            Todo List Dashboard
          </h1>
          <p className="text-slate-500 text-sm sm:text-base m-0">
            Organize tasks, manage priorities, and stay productive with a clean
            overview.
          </p>
          <div className="pt-2">
            <Button
              type="primary"
              size="large"
              icon={<Plus className="w-4 h-4 inline mr-1" />}
              className="bg-blue-600 hover:bg-blue-700 border-none rounded-lg font-medium shadow-sm"
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
              className="rounded-lg font-medium shadow-sm ml-2"
              onClick={() => setShowCategories(!showCategories)}
            >
              {showCategories ? "Hide Categories" : "Manage Categories"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
