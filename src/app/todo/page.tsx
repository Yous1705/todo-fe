"use client";
import { useTodo } from "@/context/todo.context";
import { PriorityEnum, SearchTodoParams, StatusEnum } from "@/type/todo.type";
import { Badge, Button, Table } from "antd";
import React, { useState } from "react";

function page() {
  const {
    todo,
    meta,
    loading,
    error,
    page,
    setPage,
    searchTodos,
    clearSearch,
  } = useTodo();
  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState<SearchTodoParams>({
    title: "",
    status: undefined,
    priority: undefined,
  });

  const handleSearch = async () => {
    // Hapus field kosong agar tidak dikirim ke backend
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

    // Jika tidak ada filter, tampilkan semua todo
    if (Object.keys(params).length === 0) {
      await clearSearch();
      return;
    }

    await searchTodos(params);
  };

  if (loading) return <div>loading</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        {/* Title */}
        <input
          type="text"
          placeholder="Search by title"
          value={filters.title ?? ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              title: e.target.value,
            })
          }
        />

        {/* Status */}
        <select
          value={filters.status ?? ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              status: (e.target.value || undefined) as StatusEnum | undefined,
            })
          }
        >
          <option value="">All Status</option>
          <option value="INCOMPLETE">Incomplete</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Priority */}
        <select
          value={filters.priority ?? ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              priority: (e.target.value || undefined) as
                | PriorityEnum
                | undefined,
            })
          }
        >
          <option value="">All Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        {/* Buttons */}
        <button onClick={handleSearch}>Search</button>

        <button
          onClick={async () => {
            setFilters({
              title: "",
              status: undefined,
              priority: undefined,
            });

            await clearSearch();
          }}
        >
          Reset
        </button>
      </div>
      <Table
        dataSource={todo}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Due Date",
            dataIndex: "due_date",
            key: "due_date",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
          },
        ]}
      />
      {/* <h1>TodoList</h1>
      <div>
        {todo.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <h3>{todo.description}</h3>
            <h3>{todo.due_date}</h3>
            <Badge>{todo.status}</Badge>
            <h3>{todo.category?.name}</h3>
            <h3>{todo.priority}</h3>
          </div>
        ))}

        {meta && (
          <div>
            <Button
              disabled={!meta.hasPreviousPage}
              onClick={() => setPage(page - 1)}
            >
              Previews
            </Button>
            <span>
              {meta.page} of {meta.totalPages}
            </span>

            <Button
              disabled={!meta.hasNextPage}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default page;
