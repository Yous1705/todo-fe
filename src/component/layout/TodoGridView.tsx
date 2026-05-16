import React from "react";
import { Row, Col, Card, Space, Button, Tag } from "antd";
import { Edit3, Trash2, Calendar } from "lucide-react";
import dayjs from "dayjs";
import { Todo } from "@/type/todo.type";

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
  return (
    <Row gutter={[20, 20]}>
      {todo.map((item) => (
        <Col xs={24} md={12} lg={8} key={item.id}>
          <Card
            className="border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 h-full group"
            style={{
              borderLeft: `5px solid ${item.category?.color || "#CBD5E1"}`,
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
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-slate-900 text-base m-0 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <Space
                  size={4}
                  className="opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                >
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
              </div>

              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed m-0">
                {item.description || "No description provided."}
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {item.due_date
                      ? dayjs(item.due_date).format("MMM D, YYYY")
                      : "No Date"}
                  </span>
                </div>
                {item.category?.name && (
                  <span className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded text-[11px]">
                    {item.category.name}
                  </span>
                )}
              </div>

              <div className="flex gap-1.5">
                <Tag
                  color={item.status === "COMPLETED" ? "success" : "warning"}
                  className="rounded-full border-none px-2.5 m-0 font-medium text-[11px]"
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
                  className="rounded-full border-none px-2.5 m-0 font-medium text-[11px]"
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
