"use client";
import CreateTodoDrawer from "@/component/CreateTodoDrawer";
import UpdateTodoDrawer from "@/component/UpdateTodoDrawer";

import {
  PriorityEnum,
  SearchTodoParams,
  StatusEnum,
  Todo,
} from "@/type/todo.type";
import React, { useState } from "react";

import {
  Card,
  Button,
  Input,
  Select,
  Space,
  Row,
  Col,
  Pagination,
  Tag,
  ConfigProvider,
  theme,
  Radio,
  Table,
} from "antd";

import {
  Search,
  RotateCcw,
  Plus,
  Calendar,
  Trash2,
  Edit3,
  Clock,
  LayoutGrid,
  List,
} from "lucide-react";
import dayjs from "dayjs";
import { useTodo } from "@/hooks/useTodo";
import { useCategory } from "@/hooks/useCategory";
import { categoryService } from "@/services/category.service";

function Page() {
  const {
    todo,
    meta,
    loading,
    error,
    page,
    setPage,
    searchTodos,
    clearSearch,
    deleteTodo,
    fetchTodosByCategory,
  } = useTodo();
  const { categories } = useCategory();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState<
    SearchTodoParams & { categoryId?: number }
  >({
    title: "",
    status: undefined,
    priority: undefined,
    categoryId: undefined,
  });

  const handleSearch = async () => {
    if (filters.categoryId) {
      await fetchTodosByCategory(filters.categoryId);
      return;
    }

    const params: SearchTodoParams = {};

    if (filters.title?.trim()) {
      params.title = filters.title.trim();
    }

    if (filters.status) {
      params.status = filters.status;
    }

    if (filters.priority) {
      params.priority = filters.priority;
    }

    if (Object.keys(params).length === 0) {
      await clearSearch();
      return;
    }

    await searchTodos(params);
  };

  const handleOpenUpdate = (item: Todo) => {
    setSelectedTodo(item);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedTodo(null);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteTodo(id);
    } finally {
      setDeletingId(null);
    }
  };

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
          <span>{date ? new Date(date).toLocaleDateString() : "-"}</span>
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

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-slate-500 bg-slate-50">
        Loading application...
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-rose-500 bg-slate-50">
        {error}
      </div>
    );

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <div className="min-h-screen bg-[#F8FAFC] py-10 antialiased">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
                  Organize tasks, manage priorities, and stay productive with a
                  clean overview.
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
                </div>
              </div>

              <div className="hidden md:block w-44 h-28 opacity-80 flex-shrink-0">
                <svg
                  viewBox="0 0 200 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <rect
                    x="20"
                    y="20"
                    width="120"
                    height="90"
                    rx="12"
                    fill="#EFF6FF"
                    stroke="#DBEAFE"
                    strokeWidth="2"
                  />
                  <rect
                    x="40"
                    y="45"
                    width="80"
                    height="8"
                    rx="4"
                    fill="#3B82F6"
                  />
                  <rect
                    x="40"
                    y="65"
                    width="60"
                    height="8"
                    rx="4"
                    fill="#94A3B8"
                  />
                  <circle
                    cx="160"
                    cy="40"
                    r="16"
                    fill="#F0FDF4"
                    stroke="#BBF7D0"
                    strokeWidth="2"
                  />
                  <path
                    d="M155 40L158 43L165 36"
                    stroke="#16A34A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card
            className="border-slate-200/80 shadow-sm"
            styles={{ body: { padding: "1rem" } }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <Space wrap size="middle" className="w-full lg:w-auto">
                <Input
                  placeholder="Search by title..."
                  prefix={<Search className="w-4 h-4 text-slate-400 mr-1" />}
                  className="w-full sm:w-64 rounded-lg"
                  value={filters.title ?? ""}
                  onChange={(e) =>
                    setFilters({ ...filters, title: e.target.value })
                  }
                  onPressEnter={handleSearch}
                />

                <Select
                  placeholder="All Status"
                  className="w-full sm:w-40"
                  value={filters.status}
                  onChange={(value) =>
                    setFilters({ ...filters, status: value || undefined })
                  }
                  options={[
                    { value: "", label: "All Status" },
                    { value: "INCOMPLETE", label: "Incomplete" },
                    { value: "COMPLETED", label: "Completed" },
                  ]}
                />

                <Select
                  placeholder="All Category"
                  className="w-full sm:w-48"
                  value={filters.categoryId}
                  allowClear
                  onChange={(value) =>
                    setFilters({
                      ...filters,
                      categoryId: value,
                    })
                  }
                  options={categories.map((category) => ({
                    value: category.id,
                    label: (
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.name}</span>
                      </div>
                    ),
                  }))}
                />

                <Select
                  placeholder="All Priority"
                  className="w-full sm:w-40"
                  value={filters.priority}
                  onChange={(value) =>
                    setFilters({ ...filters, priority: value || undefined })
                  }
                  options={[
                    { value: "", label: "All Priority" },
                    { value: "LOW", label: "Low" },
                    { value: "MEDIUM", label: "Medium" },
                    { value: "HIGH", label: "High" },
                  ]}
                />
              </Space>

              <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto border-t lg:border-none pt-3 lg:pt-0">
                <Radio.Group
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  optionType="button"
                  buttonStyle="solid"
                  className="shadow-sm flex-shrink-0"
                >
                  <Radio.Button
                    value="grid"
                    className="flex items-center justify-center h-8 px-3"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Radio.Button>
                  <Radio.Button
                    value="list"
                    className="flex items-center justify-center h-8 px-3"
                  >
                    <List className="w-4 h-4" />
                  </Radio.Button>
                </Radio.Group>

                <Space size="small">
                  <Button
                    type="primary"
                    onClick={handleSearch}
                    className="bg-slate-900 hover:bg-slate-800 border-none rounded-lg h-8"
                  >
                    Apply
                  </Button>
                  <Button
                    icon={<RotateCcw className="w-4 h-4 inline" />}
                    onClick={async () => {
                      setFilters({
                        title: "",
                        status: undefined,
                        priority: undefined,
                        categoryId: undefined,
                      });
                      await clearSearch();
                    }}
                    className="rounded-lg flex items-center justify-center h-8 w-8"
                  />
                </Space>
              </div>
            </div>
          </Card>

          {todo.length === 0 ? (
            <Card
              className="border-slate-200/80 text-center max-w-xl mx-auto shadow-sm"
              styles={{ body: { padding: "3rem 2rem" } }}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 m-0">
                    No tasks found
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 mb-0">
                    Create your first todo item or adjust filters to start
                    organizing your day.
                  </p>
                </div>
                <Button
                  type="primary"
                  onClick={() => setOpenCreate(true)}
                  className="bg-blue-600 rounded-lg"
                >
                  Create Todo
                </Button>
              </div>
            </Card>
          ) : viewMode === "grid" ? (
            <Row gutter={[20, 20]}>
              {todo.map((item) => (
                <Col xs={24} md={12} lg={8} key={item.id}>
                  <Card
                    className="border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 h-full group"
                    style={{
                      borderLeft: `5px solid ${
                        item.category?.color || "#CBD5E1"
                      }`,
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
                          color={
                            item.status === "COMPLETED" ? "success" : "warning"
                          }
                          className="rounded-full border-none px-2.5 m-0 font-medium text-[11px]"
                        >
                          {item.status === "COMPLETED"
                            ? "Completed"
                            : "Incomplete"}
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
          ) : (
            <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
              <Table
                dataSource={todo}
                columns={columns}
                rowKey="id"
                pagination={false}
                className="[&_.ant-table]:bg-transparent"
                onRow={(record) => ({
                  style: {
                    background: `5px solid ${
                      record.category?.color || "#255590"
                    }`,
                  },
                })}
              />
            </div>
          )}

          {meta && (
            <div className="flex items-center justify-between border-t border-slate-200/80 pt-6">
              <span className="text-sm text-slate-500 font-medium">
                Showing page{" "}
                <span className="text-slate-900 font-semibold">
                  {meta.page}
                </span>{" "}
                of {meta.totalPages}
              </span>
              <Pagination
                simple
                current={page}
                total={meta.totalPages * 10}
                onChange={(p) => setPage(p)}
                disabled={loading}
              />
            </div>
          )}
        </div>

        <CreateTodoDrawer
          open={openCreate}
          onClose={() => setOpenCreate(false)}
        />
        <UpdateTodoDrawer
          open={openUpdate}
          onClose={handleCloseUpdate}
          todo={selectedTodo}
        />
      </div>
    </ConfigProvider>
  );
}

export default Page;
