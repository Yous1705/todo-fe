"use client";

import { useState } from "react";
import { Button, ColorPicker, Drawer, Form, Input, Space } from "antd";
import type { Color } from "antd/es/color-picker";
import { Plus } from "lucide-react";

import { useCategory } from "@/hooks/useCategory";
import { CreateCategoryDto } from "@/type/category.type";

interface CreateCategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

function CreateCategoryDrawer({ open, onClose }: CreateCategoryDrawerProps) {
  const [form] = Form.useForm<CreateCategoryDto>();
  const { createCategory, loading } = useCategory();

  const [selectedColor, setSelectedColor] = useState<string>("#3B82F6");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const success = await createCategory({
        ...values,
        color: selectedColor,
      });

      if (success) {
        form.resetFields();
        setSelectedColor("#3B82F6");
        onClose();
      }
    } catch (error) {
      console.log("err : ", error);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setSelectedColor("#3B82F6");
    onClose();
  };

  return (
    <Drawer
      title="Create Category"
      open={open}
      onClose={handleClose}
      size="large"
      destroyOnHidden
      extra={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={handleSubmit}
            loading={loading}
          >
            Create
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: "",
          color: "#3B82F6",
        }}
      >
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
              style={{ backgroundColor: selectedColor }}
            />
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default CreateCategoryDrawer;
