"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useTask } from "@/hooks/useTask";
import { ConfigProvider, theme, Spin, notification, Form, Button } from "antd";
import {
  PlusOutlined,
  ArrowLeftOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

import TodoDetailCard from "@/app/todo/components/TodoDetailCard";
import TaskFilters from "@/app/todo/components/TaskFilters";
import TaskCard from "@/app/todo/components/TaskCard";
import CreateTaskModal from "@/app/todo/components/CreateTaskModal";
import UpdateTaskModal from "@/app/todo/components/UpdateTaskModal";
import CompleteTaskModal from "@/app/todo/components/CompleteTaskModal";
import { useTaskTimer } from "@/app/todo/hooks/useTaskTimer";
import type { TaskDto, TaskList } from "@/type/task.type";

export default function TaskPage() {
  const params = useParams();
  const id = Number(params.id);

  const {
    todo,
    fetchTodoDetail,
    createTask,
    updateTask,
    completeTask,
    loading,
    query,
    setQuery,
    startTask,
    pauseTask,
  } = useTask();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [completeFiles, setCompleteFiles] = useState<File[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskList | null>(null);

  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  const tick = useTaskTimer(todo?.task);

  useEffect(() => {
    if (id) {
      fetchTodoDetail(id);
    }
  }, [id, query]);

  const handleCreate = async (values: TaskDto) => {
    await createTask(id, values);
    setOpenCreate(false);
    form.resetFields();
    notification.success({
      message: "Task Created",
      description: "Successfully added a new subtask to current scope.",
      placement: "bottomRight",
    });
  };

  const handleOpenUpdate = (task: TaskList) => {
    setSelectedTask(task);
    updateForm.setFieldsValue({
      title: task.title,
      description: task.description,
    });
    setOpenUpdate(true);
  };

  const handleUpdate = async (values: TaskDto) => {
    if (!selectedTask) return;
    await updateTask(id, selectedTask.id, values);
    setOpenUpdate(false);
    setSelectedTask(null);
    notification.success({
      message: "Task Updated",
      description:
        "Changes have been successfully synchronized to base layers.",
      placement: "bottomRight",
    });
  };

  const handleOpenComplete = (task: TaskList) => {
    setSelectedTask(task);
    setCompleteFiles([]);
    setOpenComplete(true);
  };

  const handleComplete = async () => {
    if (!selectedTask) return;
    try {
      await completeTask(id, selectedTask.id, completeFiles);
      setOpenComplete(false);
      setSelectedTask(null);
      setCompleteFiles([]);
      notification.success({
        message: "Task Completed",
        description: "Milestone saved and evidence submitted safely.",
        placement: "bottomRight",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const stats = useMemo(() => {
    const tasks = todo?.task || [];
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "COMPLETED").length;
    const active = tasks.filter(
      (t) => t.isRunning && t.status !== "COMPLETED",
    ).length;
    const idle = total - completed - active;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    let motivation = "Not Started";
    let motivationColor = "text-slate-400";
    if (percentage === 100) {
      motivation = "Completed — Scope fulfilled! 🚀";
      motivationColor = "text-emerald-400";
    } else if (percentage >= 50) {
      motivation = "Almost There — Over halfway done! 🔥";
      motivationColor = "text-amber-400";
    } else if (percentage > 0) {
      motivation = "In Progress — Making solid gains! ⚡";
      motivationColor = "text-blue-400";
    } else {
      motivation = "Not Started — Initialize task timers! 🎯";
      motivationColor = "text-slate-500";
    }

    return {
      total,
      completed,
      active,
      idle,
      percentage,
      motivation,
      motivationColor,
    };
  }, [todo?.task]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#181A20] text-white">
        <Spin size="large" />
        <p className="text-sm text-[#B0BEC5] mt-4 animate-pulse">
          Syncing application services...
        </p>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1976D2",
          colorBgContainer: "#23272F",
          colorBgLayout: "#181A20",
          colorTextBase: "#FFFFFF",
          colorTextSecondary: "#B0BEC5",
          borderRadius: 12,
        },
      }}
    >
      <div className="min-h-screen bg-[#181A20] text-white font-sans antialiased pb-12">
        <div className="border-b border-[#2D3139] bg-[#181A20]/80 backdrop-blur sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="flex items-center justify-center p-2 rounded-lg bg-[#23272F] hover:bg-[#2D3139] border border-[#2D3139] text-[#B0BEC5] transition-all">
                <ArrowLeftOutlined className="text-xs" />
              </button>
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#B0BEC5]">
                <span>Workspace</span>
                <span className="text-[#2D3139]">/</span>
                <span className="text-[#1976D2] bg-[#1976D2]/10 px-2 py-0.5 rounded">
                  Scope Backlog
                </span>
              </div>
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpenCreate(true)}
              className="bg-[#1976D2] hover:bg-[#2196F3] border-none font-semibold h-9"
            >
              Create Task
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
          <TodoDetailCard todo={todo} stats={stats} />
          <TaskFilters query={query} setQuery={setQuery} />

          <div className="space-y-4">
            {todo?.task && todo.task.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {todo.task.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    tick={tick}
                    onEdit={handleOpenUpdate}
                    onComplete={handleOpenComplete}
                    onStart={() => startTask(id, task.id)}
                    onPause={() => pauseTask(id, task.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#23272F] border border-[#2D3139] rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-5">
                <FolderOpenOutlined className="text-4xl text-[#B0BEC5]/20" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    No tasks created yet.
                  </h3>
                  <p className="text-xs text-[#B0BEC5]/60 max-w-xs mx-auto">
                    Adjust search queries or draft a new atomic action item to
                    deploy tasks to this backlog.
                  </p>
                </div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenCreate(true)}
                  className="bg-[#1976D2] border-none font-bold"
                >
                  Create Task
                </Button>
              </div>
            )}
          </div>
        </div>

        <CreateTaskModal
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          form={form}
          onCreate={handleCreate}
        />
        <UpdateTaskModal
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          form={updateForm}
          onUpdate={handleUpdate}
        />
        <CompleteTaskModal
          open={openComplete}
          loading={loading}
          selectedTask={selectedTask}
          completeFiles={completeFiles}
          setCompleteFiles={setCompleteFiles}
          onClose={() => {
            setOpenComplete(false);
            setSelectedTask(null);
            setCompleteFiles([]);
          }}
          onComplete={handleComplete}
        />
      </div>
    </ConfigProvider>
  );
}
