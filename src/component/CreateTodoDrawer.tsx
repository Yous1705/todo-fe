"use client";

import { useState } from "react";
import { Button, Drawer, Form, Input, Select, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

import { PriorityEnum, StatusEnum } from "@/type/todo.type";
import { useTodo } from "@/hooks/useTodo";
import { useCategory } from "@/hooks/useCategory"; // ✅ pakai hook

const { TextArea } = Input;

interface CreateTodoDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface CreateTodoFormValues {
  title: string;
  description?: string;
  priority: PriorityEnum;
  status: StatusEnum;
  due_date?: Dayjs;
  categoryId?: number;
}

export default function CreateTodoDrawer({
  open,
  onClose,
}: CreateTodoDrawerProps) {
  const [form] = Form.useForm<CreateTodoFormValues>();
  const [loading, setLoading] = useState(false);
  const { createTodo } = useTodo();
  const { categories, loading: categoryLoading } = useCategory(); // ✅

  const handleSubmit = async (values: CreateTodoFormValues) => {
    try {
      setLoading(true);
      await createTodo({
        title: values.title,
        description: values.description ?? "",
        priority: values.priority,
        status: values.status ?? "INCOMPLETE",
        due_date: values.due_date ?? dayjs(),
        categoryId: Number(values.categoryId),
      });
      form.resetFields();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Create Todo"
      open={open}
      onClose={onClose}
      size="large"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ priority: "LOW", status: "INCOMPLETE" }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Priority" name="priority">
          <Select
            options={[
              { label: "Low", value: "LOW" },
              { label: "Medium", value: "MEDIUM" },
              { label: "High", value: "HIGH" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            options={[
              { label: "Incomplete", value: "INCOMPLETE" },
              { label: "Completed", value: "COMPLETED" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Due Date" name="due_date">
          <DatePicker showTime className="w-full" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Select
            loading={categoryLoading}
            placeholder="Select a category"
            options={categories.map((cat) => ({
              label: (
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.name}
                </div>
              ),
              value: cat.id,
            }))}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Create Todo
        </Button>
      </Form>
    </Drawer>
  );
}
