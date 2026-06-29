"use client";
import React from "react";
import { Row, Col, Card, Space, Button, Tag, Popconfirm } from "antd";
import { Edit3, Trash2, Calendar } from "lucide-react";
import dayjs from "dayjs";
import { Todo } from "@/type/todo.type";
import { useRouter } from "next/navigation";

interface TodoGridViewProps {
  todo: Todo[];
  deletingId: number | null;
  handleOpenUpdate: (item: Todo) => void;
  handleDelete: (id: number) => void;
}

export default function TodoGridView({
  todo,
  deletingId,
  handleOpenUpdate,
  handleDelete,
}: TodoGridViewProps) {
  const router = useRouter();
  return (
    <Row gutter={[20, 20]}>
      {todo.map((item) => (
        <Col xs={24} md={12} lg={8} key={item.id}>
          <Card
            className="border-slate-800/60 bg-[#151D30] hover:border-slate-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full group overflow-hidden"
            style={{
              borderLeft: `5px solid ${item.category?.color || "#475569"}`,
            }}
            styles={{
              body: {
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
              },
            }}
          >
            <div className="flex-1 space-y-3">
              {item.images?.length > 0 && (
                <div className="mb-3 overflow-hidden rounded-xl border border-slate-800 bg-[#0B0F19]">
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="flex items-start justify-between gap-4">
                <h3
                  className="font-bold text-slate-100 text-base m-0 line-clamp-1 group-hover:text-blue-400 transition-colors cursor-pointer"
                  onClick={() => router.push(`/todo/${item.id}`)}
                >
                  {item.title}
                </h3>

                <Space
                  size={4}
                  className="opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                >
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
              </div>

              <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed m-0">
                {item.description || "No description provided."}
              </p>
            </div>

            <div className="pt-3.5 mt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {item.due_date
                      ? dayjs(item.due_date).format("MMM D, YYYY")
                      : "No Date"}
                  </span>
                </div>

                {item.category?.name && (
                  <span
                    className="font-bold px-2 py-0.5 rounded-lg text-[10px]"
                    style={{
                      backgroundColor: `${item.category.color}20`,
                      color: item.category.color,
                    }}
                  >
                    {item.category.name}
                  </span>
                )}
              </div>

              <div className="flex gap-1.5">
                <Tag
                  color={item.status === "COMPLETED" ? "success" : "warning"}
                  className="rounded-full border-none px-2.5 m-0 font-bold text-[10px] uppercase tracking-wider"
                >
                  {item.status === "COMPLETED" ? "Completed" : "Incomplete"}
                </Tag>

                <Tag
                  color={
                    item.priority === "HIGH"
                      ? "error"
                      : item.priority === "MEDIUM"
                        ? "processing"
                        : "default"
                  }
                  className="rounded-full border-none px-2.5 m-0 font-bold text-[10px] uppercase tracking-wider"
                >
                  {item.priority}
                </Tag>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
