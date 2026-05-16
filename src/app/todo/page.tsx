"use client";

import React, { useState } from "react";
import { Card, Pagination, ConfigProvider, theme, App } from "antd";
import { Clock } from "lucide-react";
import { useTodo } from "@/hooks/useTodo";
import { useCategory } from "@/hooks/useCategory";
import { SearchTodoParams, Todo } from "@/type/todo.type";
import { Category } from "@/type/category.type";
import CreateTodoDrawer from "@/component/CreateTodoDrawer";
import UpdateTodoDrawer from "@/component/UpdateTodoDrawer";
import CreateCategoryDrawer from "@/component/CreateCategoryDrawer";
import UpdateCategoryDrawer from "@/component/updateCategoryDrawer";
import DashboardHeader from "@/component/layout/DashboardHeader";
import FilterToolbar from "@/component/layout/FilterToolbar";
import CategoryManager from "@/component/layout/CategoryManager";
import TodoGridView from "@/component/layout/TodoGridView";
import TodoListView from "@/component/layout/TodoListView";

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
  const { categories, deleteCategory } = useCategory();

  // Drawers Visibility States
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
          <DashboardHeader
            showCategories={showCategories}
            setShowCategories={setShowCategories}
            setOpenCreate={setOpenCreate}
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
              className="border-slate-200/80 text-center max-w-xl mx-auto shadow-sm"
              styles={{ body: { padding: "3rem 2rem" } }}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 m-0">
                  No tasks found
                </h3>
                <button
                  onClick={() => setOpenCreate(true)}
                  className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700"
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

        {/* Global Drawers */}
        <CreateTodoDrawer
          open={openCreate}
          onClose={() => setOpenCreate(false)}
        />
        <UpdateTodoDrawer
          open={openUpdate}
          onClose={() => {
            setOpenUpdate(false);
            setSelectedTodo(null);
          }}
          todo={selectedTodo}
        />
        <CreateCategoryDrawer
          open={openCreateCategory}
          onClose={() => setOpenCreateCategory(false)}
        />
        <UpdateCategoryDrawer
          open={openUpdateCategory}
          onClose={() => {
            setOpenUpdateCategory(false);
            setSelectedCategory(null);
          }}
          category={selectedCategory}
        />
      </div>
    </ConfigProvider>
  );
}

export default Page;
