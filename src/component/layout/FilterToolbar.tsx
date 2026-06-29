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
      className="border-slate-800/60 bg-[#151D30] shadow-xl"
      styles={{ body: { padding: "1rem" } }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <Space wrap size="middle" className="w-full lg:w-auto">
          <Input
            placeholder="Search by title..."
            prefix={<Search className="w-4 h-4 text-slate-400 mr-1.5" />}
            className="w-full sm:w-64 rounded-xl border-slate-700 bg-[#1E293B]"
            value={filters.title ?? ""}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            onPressEnter={handleSearch}
          />

          <Select
            placeholder="All Status"
            className="w-full sm:w-40"
            classNames={{
              popup: {
                root: "bg-[#151D30] border border-slate-800 rounded-xl",
              },
            }}
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
            placeholder="All Categories"
            className="w-full sm:w-48"
            classNames={{
              popup: {
                root: "bg-[#151D30] border border-slate-800 rounded-xl",
              },
            }}
            value={filters.categoryId}
            allowClear
            onChange={(value) => setFilters({ ...filters, categoryId: value })}
            options={categories.map((cat) => ({
              value: cat.id,
              label: (
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{cat.name}</span>
                </div>
              ),
            }))}
          />

          <Select
            placeholder="All Priorities"
            className="w-full sm:w-40"
            classNames={{
              popup: {
                root: "bg-[#151D30] border border-slate-800 rounded-xl",
              },
            }}
            value={filters.priority}
            onChange={(value) =>
              setFilters({ ...filters, priority: value || undefined })
            }
            options={[
              { value: "", label: "All Priorities" },
              { value: "LOW", label: "Low" },
              { value: "MEDIUM", label: "Medium" },
              { value: "HIGH", label: "High" },
            ]}
          />
        </Space>

        <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto border-t border-slate-800 lg:border-none pt-3 lg:pt-0">
          <Radio.Group
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            optionType="button"
            buttonStyle="solid"
            className="rounded-xl overflow-hidden"
          >
            <Radio.Button
              value="grid"
              className="flex items-center justify-center h-9 px-3 border-slate-700 bg-[#1E293B]"
            >
              <LayoutGrid className="w-4 h-4" />
            </Radio.Button>
            <Radio.Button
              value="list"
              className="flex items-center justify-center h-9 px-3 border-slate-700 bg-[#1E293B]"
            >
              <List className="w-4 h-4" />
            </Radio.Button>
          </Radio.Group>

          <Space size="small">
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white hover:bg-blue-700 px-5 h-9 text-sm font-semibold rounded-xl transition-colors shadow-md"
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
              className="border border-slate-700 bg-[#1E293B] hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center h-9 w-9 rounded-xl transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </Space>
        </div>
      </div>
    </Card>
  );
}
