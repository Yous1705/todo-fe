import React from "react";
import { Card, Button, Tooltip, Popconfirm } from "antd";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Category } from "@/type/category.type";

interface CategoryManagerProps {
  categories: Category[];
  deletingCategoryId: number | null;
  setOpenCreateCategory: (open: boolean) => void;
  handleOpenUpdateCategory: (category: Category) => void;
  handleDeleteCategory: (id: number) => void;
}

export default function CategoryManager({
  categories,
  deletingCategoryId,
  setOpenCreateCategory,
  handleOpenUpdateCategory,
  handleDeleteCategory,
}: CategoryManagerProps) {
  return (
    <Card
      className="border-slate-800/60 bg-[#151D30] shadow-xl"
      styles={{ body: { padding: "1.25rem" } }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider m-0">
          Categories Manager
        </h3>
        <Button
          type="primary"
          size="small"
          icon={<Plus className="w-3.5 h-3.5" />}
          className="bg-blue-600 hover:bg-blue-700 border-none rounded-lg text-xs font-semibold"
          onClick={() => setOpenCreateCategory(true)}
        >
          Add Category
        </Button>
      </div>

      <div className="flex flex-wrap gap-2.5 max-h-40 overflow-y-auto p-1">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-2 bg-[#1E293B] border border-slate-700/50 rounded-xl px-3.5 py-1.5 shadow-sm hover:border-slate-600 transition"
          >
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm font-semibold text-slate-200">
              {category.name}
            </span>

            <div className="flex items-center gap-1 border-l border-slate-700 pl-2 ml-1">
              <Tooltip title="Edit">
                <Button
                  type="text"
                  size="small"
                  className="p-1 h-auto text-slate-400 hover:text-blue-400 hover:bg-slate-800"
                  icon={<Pencil className="w-3.5 h-3.5" />}
                  onClick={() => handleOpenUpdateCategory(category)}
                />
              </Tooltip>

              <Popconfirm
                title="Delete category"
                description={`Are you sure you want to delete '${category.name}'?`}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true, className: "rounded-lg" }}
                cancelButtonProps={{ className: "rounded-lg" }}
                onConfirm={() => handleDeleteCategory(category.id)}
              >
                <Tooltip title="Delete">
                  <Button
                    type="text"
                    size="small"
                    danger
                    className="p-1 h-auto text-slate-400 hover:text-rose-400 hover:bg-rose-950/30"
                    loading={deletingCategoryId === category.id}
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                  />
                </Tooltip>
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
