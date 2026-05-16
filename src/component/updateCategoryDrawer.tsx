"use client";

import { useEffect, useState } from "react";
import { Button, ColorPicker, Drawer, Form, Input, Space } from "antd";
import type { Color } from "antd/es/color-picker";
import { Save } from "lucide-react";

import { useCategory } from "@/hooks/useCategory";
import { Category, UpdateCategoryDto } from "@/type/category.type";

interface UpdateCategoryDrawerProps {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

function UpdateCategoryDrawer({
  open,
  onClose,
  category,
}: UpdateCategoryDrawerProps) {
  const [form] = Form.useForm<UpdateCategoryDto>();
  const { updateCategory, loading } = useCategory();

  const [selectedColor, setSelectedColor] = useState<string>("#3B82F6");

  useEffect(() => {
    if (open && category) {
      form.setFieldsValue({
        name: category.name,
        color: category.color,
      });

      setSelectedColor(category.color || "#3B82F6");
    }
  }, [open, category, form]);

  const handleSubmit = async () => {
    if (!category) return;

    try {
      const values = await form.validateFields();

      const success = await updateCategory(category.id, {
        ...values,
        color: selectedColor,
      });

      if (success) {
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.log("err : ", error);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="Update Category"
      open={open}
      onClose={handleClose}
      size="large"
      destroyOnHidden
      extra={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSubmit}
            loading={loading}
          >
            Save Changes
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Category name is required",
            },
          ]}
        >
          <Input placeholder="e.g. Work, Personal, Study" size="large" />
        </Form.Item>

        <Form.Item label="Category Color">
          <div className="flex items-center gap-3">
            <ColorPicker
              value={selectedColor}
              onChange={(value: Color) => setSelectedColor(value.toHexString())}
              showText
            />
            <div
              className="w-8 h-8 rounded-lg border border-slate-200"
              style={{
                backgroundColor: selectedColor,
              }}
            />
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default UpdateCategoryDrawer;
