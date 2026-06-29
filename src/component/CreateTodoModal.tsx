"use client";

import { useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker, Upload } from "antd";
import dayjs from "dayjs";
import { useTodo } from "@/hooks/useTodo";
import { useCategory } from "@/hooks/useCategory";

const { TextArea } = Input;

interface CreateTodoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTodoModal({
  open,
  onClose,
}: CreateTodoModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { createTodo } = useTodo();
  const [files, setFiles] = useState<File[]>([]);
  const { categories, loading: categoryLoading } = useCategory();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await createTodo(
        {
          title: values.title,
          description: values.description ?? "",
          priority: values.priority,
          status: values.status ?? "INCOMPLETE",
          due_date: values.due_date
            ? values.due_date.toISOString()
            : dayjs().toISOString(),
          categoryId: Number(values.categoryId),
        },
        files,
      );
      form.resetFields();
      setFiles([]);
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
          Create New Task
        </span>
      }
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      centered
      width={640}
      destroyOnHidden
      okText="Create Task"
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
        className="pt-4"
        initialValues={{ priority: "LOW", status: "INCOMPLETE" }}
      >
        <Form.Item
          label={
            <span className="font-bold text-slate-300 text-xs">Task Title</span>
          }
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input
            placeholder="Enter task title..."
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
            placeholder="Add specific task notes..."
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
              <span className="font-bold text-slate-300 text-xs">Category</span>
            }
            name="categoryId"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select
              size="large"
              loading={categoryLoading}
              placeholder="Select category"
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

        <Form.Item
          label={
            <span className="font-bold text-slate-300 text-xs">
              Images Attachment
            </span>
          }
        >
          <Upload
            multiple
            beforeUpload={(file) => {
              setFiles((prev) => [...prev, file]);
              return false;
            }}
            onRemove={(file) => {
              setFiles((prev) => prev.filter((f) => f.name !== file.name));
            }}
          >
            <Button
              size="large"
              className="rounded-xl border-dashed border-2 w-full bg-transparent hover:border-blue-500 text-slate-400"
            >
              Select Task Images
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
