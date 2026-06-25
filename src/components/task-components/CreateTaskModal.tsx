"use client";

import React from "react";
import { Button, Form, Input, Modal } from "antd";
import type { TaskDto } from "@/type/task.type";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  form: any;
  onCreate: (values: TaskDto) => Promise<void>;
}

export default function CreateTaskModal({
  open,
  onClose,
  form,
  onCreate,
}: CreateTaskModalProps) {
  return (
    <Modal
      title={
        <div className="text-white font-bold border-b border-[#2D3139] pb-3">
          Create New Task
        </div>
      }
      open={open}
      onOk={() => form.submit()}
      onCancel={onClose}
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{
        className: "bg-[#1976D2] border-none font-bold h-9",
      }}
      cancelButtonProps={{
        className: "border-[#2D3139] text-[#B0BEC5] h-9",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onCreate}
        className="pt-4 space-y-4"
      >
        <Form.Item
          name="title"
          label={
            <span className="text-[#B0BEC5] text-xs font-bold uppercase tracking-wider">
              Title
            </span>
          }
          rules={[{ required: true, message: "Task title is required" }]}
        >
          <Input
            placeholder="Enter core assignment title..."
            className="bg-[#181A20] border-[#2D3139] text-white rounded-lg h-10"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="text-[#B0BEC5] text-xs font-bold uppercase tracking-wider">
              Description
            </span>
          }
        >
          <Input.TextArea
            rows={4}
            placeholder="Add operational task details..."
            className="bg-[#181A20] border-[#2D3139] text-white rounded-lg"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
