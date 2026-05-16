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
      className="border-slate-200/80 shadow-sm"
      styles={{ body: { padding: "1rem" } }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900 m-0">
          Categories
        </h3>
        <Button
          type="primary"
          size="small"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setOpenCreateCategory(true)}
        >
          Add Category
        </Button>
      </div>

      {/* Ditambahkan scroll vertical max-h jika kategori terlalu banyak */}
      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm font-medium text-slate-700">
              {category.name}
            </span>

            <Tooltip title="Edit">
              <Button
                type="text"
                size="small"
                icon={<Pencil className="w-3.5 h-3.5" />}
                onClick={() => handleOpenUpdateCategory(category)}
              />
            </Tooltip>

            <Popconfirm
              title="Delete category"
              description={`Are you sure you want to delete '${category.name}'?`}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={() => handleDeleteCategory(category.id)}
            >
              <Tooltip title="Delete">
                <Button
                  type="text"
                  size="small"
                  danger
                  loading={deletingCategoryId === category.id}
                  icon={<Trash2 className="w-3.5 h-3.5" />}
                />
              </Tooltip>
            </Popconfirm>
          </div>
        ))}
      </div>
    </Card>
  );
}
