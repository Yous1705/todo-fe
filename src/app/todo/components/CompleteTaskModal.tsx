"use client";

import React from "react";
import { Button, Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { TaskList } from "@/type/task.type";

interface CompleteTaskModalProps {
  open: boolean;
  loading: boolean;
  selectedTask: TaskList | null;
  completeFiles: File[];
  setCompleteFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onClose: () => void;
  onComplete: () => Promise<void>;
}

export default function CompleteTaskModal({
  open,
  loading,
  selectedTask,
  completeFiles,
  setCompleteFiles,
  onClose,
  onComplete,
}: CompleteTaskModalProps) {
  return (
    <Modal
      title={
        <div className="text-white font-bold border-b border-[#2D3139] pb-3">
          Complete Task & Attach Evidence
        </div>
      }
      open={open}
      confirmLoading={loading}
      onOk={onComplete}
      onCancel={onClose}
      okText="Mark Completed"
      cancelText="Cancel"
      okButtonProps={{
        className:
          "bg-emerald-600 hover:bg-emerald-500 border-none font-bold h-9",
      }}
      cancelButtonProps={{
        className: "border-[#2D3139] text-[#B0BEC5] h-9",
      }}
      width={500}
    >
      <div className="pt-4 space-y-4">
        <p className="text-sm text-[#B0BEC5]">
          Complete task:{" "}
          <strong className="text-white">{selectedTask?.title}</strong>
        </p>

        <div className="bg-[#181A20] border border-dashed border-[#2D3139] hover:border-blue-500/40 rounded-xl p-5 transition-all">
          <Upload
            multiple
            listType="picture"
            beforeUpload={(file) => {
              setCompleteFiles((prev) => [...prev, file]);
              return false;
            }}
            onRemove={(file) => {
              setCompleteFiles((prev) =>
                prev.filter((f) => f.name !== file.name),
              );
            }}
          >
            <div className="text-center space-y-2 cursor-pointer">
              <InboxOutlined className="text-2xl text-blue-400" />
              <div className="text-xs text-[#B0BEC5]/80">
                <span className="font-bold text-white block">
                  Click to select files
                </span>
                Upload evidence artifacts for the NestJS service pipeline.
              </div>
            </div>
          </Upload>
        </div>
      </div>
    </Modal>
  );
}
