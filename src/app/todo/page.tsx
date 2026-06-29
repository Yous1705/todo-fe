"use client";

import React, { useState } from "react";
import { Card, Pagination, ConfigProvider, theme, App } from "antd";
import { Clock } from "lucide-react";
import { useTodo } from "@/hooks/useTodo";
import { useCategory } from "@/hooks/useCategory";
import { SearchTodoParams, Todo } from "@/type/todo.type";
import { Category } from "@/type/category.type";

// Modal Component Imports (Updated from Drawers)

// Layout Component Imports
import DashboardHeader from "@/component/layout/DashboardHeader";
import FilterToolbar from "@/component/layout/FilterToolbar";
import CategoryManager from "@/component/layout/CategoryManager";
import TodoGridView from "@/component/layout/TodoGridView";
import TodoListView from "@/component/layout/TodoListView";
import CreateTodoModal from "@/component/CreateTodoModal";
import UpdateTodoModal from "@/component/UpdateTodoModal";
import CreateCategoryModal from "@/component/CreateCategoryModal";
import UpdateCategoryModal from "@/component/updateCategoryModal";

function Page() {
  const {
    todo,
    meta,
    loading,
    error,
    page,
    stats,
    setPage,
    searchTodos,
    clearSearch,
    deleteTodo,
    fetchTodosByCategory,
  } = useTodo();
  const { categories, deleteCategory } = useCategory();

  // Modals Visibility States
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);

  // Focus Items State
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(
    null,
  );

  // Layout View Styles & Feature Show/Hide Categories
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCategories, setShowCategories] = useState(false);

  const [filters, setFilters] = useState<
    SearchTodoParams & { categoryId?: number }
  >({
    title: "",
    status: undefined,
    priority: undefined,
    categoryId: undefined,
  });

  // Handlers
  const handleSearch = async () => {
    if (filters.categoryId) {
      await fetchTodosByCategory(filters.categoryId);
      return;
    }
    const params: SearchTodoParams = {};
    if (filters.title?.trim()) params.title = filters.title.trim();
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;

    if (Object.keys(params).length === 0) {
      await clearSearch();
      return;
    }
    await searchTodos(params);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteTodo(id);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCategory = async (catId: number) => {
    setDeletingCategoryId(catId);
    try {
      await deleteCategory(catId);
      if (filters.categoryId === catId) {
        setFilters((prev) => ({ ...prev, categoryId: undefined }));
        await clearSearch();
      }
    } finally {
      setDeletingCategoryId(null);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-slate-400 bg-[#0B0F19]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-sm font-medium">Loading application...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-rose-400 bg-[#0B0F19]">
        <div className="bg-[#151D30] border border-rose-950/50 p-6 rounded-xl shadow-lg text-center max-w-md">
          <p className="font-semibold m-0">{error}</p>
        </div>
      </div>
    );

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#3B82F6",
          colorBgBase: "#0B0F19",
          colorBgContainer: "#151D30",
          colorBorder: "rgba(255, 255, 255, 0.08)",
          borderRadius: 12,
        },
      }}
    >
      <App>
        <div className="min-h-screen bg-[#0B0F19] py-10 antialiased text-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <DashboardHeader
              showCategories={showCategories}
              setShowCategories={setShowCategories}
              setOpenCreate={setOpenCreate}
              stats={stats}
            />

            <FilterToolbar
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              viewMode={viewMode}
              setViewMode={setViewMode}
              handleSearch={handleSearch}
              clearSearch={clearSearch}
            />

            {showCategories && (
              <CategoryManager
                categories={categories}
                deletingCategoryId={deletingCategoryId}
                setOpenCreateCategory={setOpenCreateCategory}
                handleOpenUpdateCategory={(cat) => {
                  setSelectedCategory(cat);
                  setOpenUpdateCategory(true);
                }}
                handleDeleteCategory={handleDeleteCategory}
              />
            )}

            {/* Main Content Conditional Grid/List Rendering */}
            {todo.length === 0 ? (
              <Card
                className="border-slate-800/60 bg-[#151D30] text-center max-w-xl mx-auto shadow-xl"
                styles={{ body: { padding: "3rem 2rem" } }}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#1E293B] border border-slate-700/50 rounded-full flex items-center justify-center text-slate-400">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 m-0">
                    No tasks found
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto m-0">
                    Get started by creating your very first task right now.
                  </p>
                  <button
                    onClick={() => setOpenCreate(true)}
                    className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-600/10"
                  >
                    Create Todo
                  </button>
                </div>
              </Card>
            ) : viewMode === "grid" ? (
              <TodoGridView
                todo={todo}
                deletingId={deletingId}
                handleOpenUpdate={(item) => {
                  setSelectedTodo(item);
                  setOpenUpdate(true);
                }}
                handleDelete={handleDelete}
              />
            ) : (
              <TodoListView
                todo={todo}
                deletingId={deletingId}
                handleOpenUpdate={(item) => {
                  setSelectedTodo(item);
                  setOpenUpdate(true);
                }}
                handleDelete={handleDelete}
              />
            )}

            {meta && (
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-6">
                <span className="text-sm text-slate-400 font-medium">
                  Showing page{" "}
                  <span className="text-slate-100 font-bold">{meta.page}</span>{" "}
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

          {/* Global Modals */}
          <CreateTodoModal
            open={openCreate}
            onClose={() => setOpenCreate(false)}
          />
          <UpdateTodoModal
            open={openUpdate}
            onClose={() => {
              setOpenUpdate(false);
              setSelectedTodo(null);
            }}
            todo={selectedTodo}
          />
          <CreateCategoryModal
            open={openCreateCategory}
            onClose={() => setOpenCreateCategory(false)}
          />
          <UpdateCategoryModal
            open={openUpdateCategory}
            onClose={() => {
              setOpenUpdateCategory(false);
              setSelectedCategory(null);
            }}
            category={selectedCategory}
          />
        </div>
      </App>
    </ConfigProvider>
  );
}

export default Page;
