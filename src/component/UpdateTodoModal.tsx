"use client";

import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { Todo } from "@/type/todo.type";
import { useTodo } from "@/hooks/useTodo";
import { useCategory } from "@/hooks/useCategory";

const { TextArea } = Input;

interface UpdateTodoModalProps {
  open: boolean;
  onClose: () => void;
  todo: Todo | null;
}

export default function UpdateTodoModal({
  open,
  onClose,
  todo,
}: UpdateTodoModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { updateTodo } = useTodo();
  const { categories, loading: categoryLoading } = useCategory();

  useEffect(() => {
    if (todo && open) {
      form.setFieldsValue({
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        status: todo.status,
        due_date: todo.due_date ? dayjs(todo.due_date) : undefined,
        categoryId: todo.category?.id,
      });
    }
  }, [todo, open, form]);

  const handleSubmit = async () => {
    if (!todo) return;
    try {
      setLoading(true);
      const values = await form.validateFields();
      await updateTodo(todo.id, {
        title: values.title,
        description: values.description ?? todo.description,
        priority: values.priority,
        status: values.status,
        due_date: values.due_date ? values.due_date : undefined,
        categoryId: values.categoryId ?? todo.category?.id,
      });
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <span className="font-extrabold text-slate-100 text-lg">
          Update Task Details
        </span>
      }
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      centered
      width={640}
      destroyOnHidden
      okText="Save Changes"
      cancelText="Cancel"
      okButtonProps={{
        className:
          "bg-blue-600 hover:bg-blue-700 rounded-xl px-5 h-10 font-semibold",
      }}
      cancelButtonProps={{ className: "rounded-xl h-10 px-5" }}
    >
      <Form form={form} layout="vertical" className="pt-4">
        <Form.Item
          label={
            <span className="font-bold text-slate-300 text-xs">Task Title</span>
          }
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input
            className="rounded-xl border-slate-700 bg-[#1E293B]"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-bold text-slate-300 text-xs">
              Description
            </span>
          }
          name="description"
        >
          <TextArea
            rows={3}
            className="rounded-xl border-slate-700 bg-[#1E293B]"
          />
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="font-bold text-slate-300 text-xs">Priority</span>
            }
            name="priority"
          >
            <Select
              size="large"
              classNames={{ popup: { root: "bg-[#151D30] rounded-xl" } }}
              options={[
                { label: "Low", value: "LOW" },
                { label: "Medium", value: "MEDIUM" },
                { label: "High", value: "HIGH" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-bold text-slate-300 text-xs">Category</span>
            }
            name="categoryId"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select
              size="large"
              loading={categoryLoading}
              classNames={{ popup: { root: "bg-[#151D30] rounded-xl" } }}
              options={categories.map((cat) => ({
                label: (
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.name}
                  </div>
                ),
                value: cat.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-bold text-slate-300 text-xs">Status</span>
            }
            name="status"
          >
            <Select
              size="large"
              classNames={{ popup: { root: "bg-[#151D30] rounded-xl" } }}
              options={[
                { label: "Incomplete", value: "INCOMPLETE" },
                { label: "Completed", value: "COMPLETED" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-bold text-slate-300 text-xs">Due Date</span>
            }
            name="due_date"
          >
            <DatePicker
              showTime
              className="w-full rounded-xl border-slate-700 bg-[#1E293B]"
              size="large"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
