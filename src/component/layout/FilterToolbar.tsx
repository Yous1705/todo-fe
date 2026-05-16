import React from "react";
import { Card, Space, Input, Select, Radio } from "antd";
import { Search, LayoutGrid, List, RotateCcw } from "lucide-react";
import { SearchTodoParams } from "@/type/todo.type";
import { Category } from "@/type/category.type";

interface FilterToolbarProps {
  filters: SearchTodoParams & { categoryId?: number };
  setFilters: React.Dispatch<
    React.SetStateAction<SearchTodoParams & { categoryId?: number }>
  >;
  categories: Category[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  handleSearch: () => void;
  clearSearch: () => void;
}

export default function FilterToolbar({
  filters,
  setFilters,
  categories,
  viewMode,
  setViewMode,
  handleSearch,
  clearSearch,
}: FilterToolbarProps) {
  return (
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
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
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
            onChange={(value) => setFilters({ ...filters, categoryId: value })}
            options={categories.map((cat) => ({
              value: cat.id,
              label: (
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{cat.name}</span>
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
            <button
              onClick={handleSearch}
              className="bg-slate-900 text-white hover:bg-slate-800 px-4 h-8 text-sm font-medium rounded-lg transition-colors"
            >
              Apply
            </button>
            <button
              onClick={async () => {
                setFilters({
                  title: "",
                  status: undefined,
                  priority: undefined,
                  categoryId: undefined,
                });
                await clearSearch();
              }}
              className="border border-slate-200 hover:bg-slate-50 flex items-center justify-center h-8 w-8 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </Space>
        </div>
      </div>
    </Card>
  );
}
