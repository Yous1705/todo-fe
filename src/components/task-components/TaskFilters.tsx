import React from "react";
import {
  FilterOutlined,
  SearchOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import type { TodoTaskQuery } from "@/type/task.type";

interface TaskFiltersProps {
  query: TodoTaskQuery;
  setQuery: React.Dispatch<React.SetStateAction<TodoTaskQuery>>;
}

export default function TaskFilters({ query, setQuery }: TaskFiltersProps) {
  return (
    <div className="bg-[#23272F] border border-[#2D3139] rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="relative w-full md:w-72">
        <SearchOutlined className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
        <input
          type="text"
          placeholder="Search task..."
          value={query.search || ""}
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, search: e.target.value }))
          }
          className="w-full bg-[#181A20] border border-[#2D3139] hover:border-blue-500/40 focus:border-[#1976D2] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none transition-all"
        />
      </div>

      <div className="w-full md:w-auto flex flex-wrap items-center gap-3 justify-end">
        <div className="flex items-center gap-2 bg-[#181A20] border border-[#2D3139] rounded-lg px-3 py-1.5 text-xs font-semibold">
          <FilterOutlined className="text-[#B0BEC5]" />
          <span className="text-[#B0BEC5]">Status:</span>
          <select
            value={query.status || ""}
            onChange={(e) =>
              setQuery((prev) => ({
                ...prev,
                status: (e.target.value || undefined) as
                  | "INCOMPLETE"
                  | "COMPLETED"
                  | undefined,
              }))
            }
            className="bg-transparent border-none text-white focus:outline-none cursor-pointer text-xs font-bold"
          >
            <option value="" className="bg-[#23272F]">
              All States
            </option>
            <option value="INCOMPLETE" className="bg-[#23272F]">
              Incomplete
            </option>
            <option value="COMPLETED" className="bg-[#23272F]">
              Completed
            </option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-[#181A20] border border-[#2D3139] rounded-lg px-3 py-1.5 text-xs font-semibold">
          <SortAscendingOutlined className="text-[#B0BEC5]" />
          <span className="text-[#B0BEC5]">Sort:</span>
          <select
            value={query.sort || "newest"}
            onChange={(e) =>
              setQuery((prev) => ({
                ...prev,
                sort: e.target.value as "newest" | "oldest" | "alphabetical",
              }))
            }
            className="bg-transparent border-none text-white focus:outline-none cursor-pointer text-xs font-bold"
          >
            <option value="newest" className="bg-[#23272F]">
              Newest First
            </option>
            <option value="oldest" className="bg-[#23272F]">
              Oldest First
            </option>
            <option value="alphabetical" className="bg-[#23272F]">
              Alphabetical
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
