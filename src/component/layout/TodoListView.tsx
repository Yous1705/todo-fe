import React from "react";
import { Table, Space, Button, Tag } from "antd";
import { Calendar, Edit3, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { Todo } from "@/type/todo.type";

interface TodoListViewProps {
  todo: Todo[];
  deletingId: number | null;
  handleOpenUpdate: (item: Todo) => void;
  handleDelete: (id: number) => void;
}

export default function TodoListView({
  todo,
  deletingId,
  handleOpenUpdate,
  handleDelete,
}: TodoListViewProps) {
  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, item: Todo) => (
        <div
          className="pl-3 py-1 -ml-4"
          style={{
            borderLeft: `4px solid ${item.category?.color || "#CBD5E1"}`,
          }}
        >
          <span
            className="font-semibold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => handleOpenUpdate(item)}
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: "text-slate-500 max-w-xs truncate",
      render: (text: string) => text || "-",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (date: string) => (
        <Space size={6} className="text-slate-400 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{date ? dayjs(date).format("L") : "-"}</span>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      render: (categoryName: string) =>
        categoryName ? (
          <span className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded text-[11px]">
            {categoryName}
          </span>
        ) : (
          "-"
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={status === "COMPLETED" ? "success" : "warning"}
          className="rounded-full border-none px-2.5 font-medium text-[11px]"
        >
          {status === "COMPLETED" ? "Completed" : "Incomplete"}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => (
        <Tag
          color={
            priority === "HIGH"
              ? "error"
              : priority === "MEDIUM"
                ? "processing"
                : "default"
          }
          className="rounded-full border-none px-2.5 font-medium text-[11px]"
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: any, item: Todo) => (
        <Space size={2}>
          <Button
            type="text"
            size="small"
            icon={<Edit3 className="w-3.5 h-3.5" />}
            onClick={() => handleOpenUpdate(item)}
            className="text-slate-400 hover:text-blue-600"
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<Trash2 className="w-3.5 h-3.5" />}
            loading={deletingId === item.id}
            onClick={() => handleDelete(item.id)}
            className="text-slate-400 hover:text-rose-600"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
      <Table
        dataSource={todo}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="[&_.ant-table]:bg-transparent"
      />
    </div>
  );
}
