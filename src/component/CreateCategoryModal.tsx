"use client";

import { useState } from "react";
import { Modal, Form, Input, ColorPicker } from "antd";
import type { Color } from "antd/es/color-picker";
import { useCategory } from "@/hooks/useCategory";

interface CreateCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal({
  open,
  onClose,
}: CreateCategoryModalProps) {
  const [form] = Form.useForm();
  const { createCategory } = useCategory();
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("#3B82F6");

  const handleSubmit = async () => {
    try {
      setLoading(true);
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setSelectedColor("#3B82F6");
    onClose();
  };

  return (
    <Modal
      title={
        <span className="font-extrabold text-slate-100 text-md">
          Create New Category
        </span>
      }
      open={open}
      onCancel={handleClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      centered
      destroyOnHidden
      okText="Create Category"
      cancelText="Cancel"
      okButtonProps={{
        className:
          "bg-blue-600 hover:bg-blue-700 rounded-xl px-5 h-10 font-semibold",
      }}
      cancelButtonProps={{ className: "rounded-xl h-10 px-5" }}
    >
      <Form
        form={form}
        layout="vertical"
        className="pt-3"
        initialValues={{ name: "", color: "#3B82F6" }}
      >
        <Form.Item
          label={
            <span className="font-bold text-slate-300 text-xs">
              Category Name
            </span>
          }
          name="name"
          rules={[{ required: true, message: "Category name is required" }]}
        >
          <Input
            placeholder="e.g. Work, Personal, Study"
            size="large"
            className="rounded-xl border-slate-700 bg-[#1E293B]"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-bold text-slate-300 text-xs">
              Category Color
            </span>
          }
        >
          <div className="flex items-center gap-3 bg-[#1E293B] border border-slate-700 p-3 rounded-xl">
            <ColorPicker
              value={selectedColor}
              onChange={(value: Color) => setSelectedColor(value.toHexString())}
              showText
            />
            <div
              className="w-8 h-8 rounded-lg border border-slate-600 shadow-sm"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
