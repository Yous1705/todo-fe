"use client";

import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { useTodo } from "@/context/todo.context";
import { PriorityEnum, StatusEnum, Todo, TodoDto } from "@/type/todo.type";

const { TextArea } = Input;

interface UpdateTodoDrawerProps {
  open: boolean;
  onClose: () => void;
  todo: Todo | null;
}

// ✅ Correct form shape: categoryId instead of category.name
interface UpdateTodoFormValues {
  title: string;
  description?: string;
  priority: PriorityEnum;
  status: StatusEnum;
  due_date?: dayjs.Dayjs;
  categoryId?: number;
}

export default function UpdateTodoDrawer({
  open,
  onClose,
  todo,
}: UpdateTodoDrawerProps) {
  // ✅ Typed as the form values, not Todo
  const [form] = Form.useForm<UpdateTodoFormValues>();
  const [loading, setLoading] = useState(false);
  const { updateTodo } = useTodo();

  useEffect(() => {
    if (todo && open) {
      form.setFieldsValue({
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        status: todo.status,
        due_date: todo.due_date ? dayjs(todo.due_date) : undefined,
        // ✅ Populate categoryId from todo.category.id
        categoryId: todo.category.id,
      });
    }
  }, [todo, open, form]);

  const handleSubmit = async (values: UpdateTodoFormValues) => {
    if (!todo) return;

    try {
      setLoading(true);

      await updateTodo(todo.id, {
        title: values.title,
        description: values.description ?? todo.description,
        priority: values.priority as PriorityEnum,
        status: values.status as StatusEnum,
        // ✅ Use form value, fall back to existing todo value
        due_date: values.due_date ?? todo.due_date ?? dayjs(),
        categoryId: values.categoryId ?? todo.category.id,
      });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Update Todo"
      open={open}
      onClose={onClose}
      width={480}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

        <Form.Item
          label="Category ID"
          name="categoryId"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Due Date" name="due_date">
          <DatePicker showTime className="w-full" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Update Todo
        </Button>
      </Form>
    </Drawer>
  );
}
