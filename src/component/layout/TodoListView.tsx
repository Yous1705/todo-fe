"use client";
import React from "react";
import { Table, Space, Button, Tag, Popconfirm } from "antd";
import { Calendar, Edit3, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { Todo } from "@/type/todo.type";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, item: Todo) => (
        <div
          className="pl-3 py-1 -ml-4 flex items-center"
          style={{
            borderLeft: `4px solid ${item.category?.color || "#475569"}`,
          }}
        >
          <span
            className="font-bold text-slate-100 cursor-pointer hover:text-blue-400 transition-colors"
            onClick={() => router.push(`/todo/${item.id}`)}
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Image",
      key: "image",
      width: 120,
      render: (_: unknown, item: Todo) =>
        item.images?.length > 0 ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-14 h-14 object-cover rounded-lg border border-slate-800 bg-[#0B0F19]"
          />
        ) : (
          <span className="text-slate-600 italic text-xs">-</span>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: "text-slate-400 max-w-xs truncate text-xs",
      render: (text: string) => text || "-",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (date: string) => (
        <Space size={6} className="text-slate-400 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{date ? dayjs(date).format("L") : "-"}</span>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      render: (categoryName: string, item: Todo) =>
        categoryName ? (
          <span
            className="font-bold px-2 py-0.5 rounded-lg text-[10px]"
            style={{
              backgroundColor: `${item.category.color}20`,
              color: item.category.color,
            }}
          >
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
          className="rounded-full border-none px-2.5 font-bold text-[10px] uppercase tracking-wider"
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
          className="rounded-full border-none px-2.5 font-bold text-[10px] uppercase tracking-wider"
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: unknown, item: Todo) => (
        <Space size={2}>
          <Button
            type="text"
            size="small"
            icon={<Edit3 className="w-3.5 h-3.5" />}
            onClick={() => handleOpenUpdate(item)}
            className="text-slate-400 hover:text-blue-400 hover:bg-slate-800"
          />
          <Popconfirm
            title="Delete task?"
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(item.id)}
          >
            <Button
              type="text"
              size="small"
              danger
              icon={<Trash2 className="w-3.5 h-3.5" />}
              loading={deletingId === item.id}
              className="text-slate-400 hover:text-rose-400 hover:bg-rose-950/30"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-[#151D30] border border-slate-800/60 rounded-2xl shadow-xl overflow-hidden">
      <Table
        dataSource={todo}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="[&_.ant-table]:bg-transparent [&_th]:bg-[#1E293B] [&_th]:text-slate-400 [&_th]:font-bold [&_th]:text-xs [&_td]:py-4"
      />
    </div>
  );
}
