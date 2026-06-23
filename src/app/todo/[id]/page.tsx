"use client";

import { useTask } from "@/hooks/useTask";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  Card,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Image,
  Spin,
} from "antd";

import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { TaskDto, TaskList } from "@/type/task.type";

export default function TaskPage() {
  const params = useParams();
  const id = Number(params.id);

  const { todo, fetchTodoDetail, createTask, updateTask, loading } = useTask();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskList | null>(null);

  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  useEffect(() => {
    if (id) {
      fetchTodoDetail(id);
    }
  }, [id]);

  const handleCreate = async (values: TaskDto) => {
    console.log(values);

    await createTask(id, values);

    setOpenCreate(false);
    form.resetFields();
  };

  const handleOpenUpdate = (task: TaskList) => {
    setSelectedTask(task);

    updateForm.setFieldsValue({
      title: task.title,
      description: task.description,
    });

    setOpenUpdate(true);
  };

  const handleUpdate = async (values: TaskDto) => {
    if (!selectedTask) return;

    await updateTask(id, selectedTask.id, values);

    setOpenUpdate(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Spin />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Card title="Todo Detail">
        <Space direction="vertical" size="small">
          <h2 className="text-xl font-semibold">{todo?.title}</h2>

          <p>{todo?.description}</p>

          <Space wrap>
            <Tag color="blue">{todo?.status}</Tag>
            <Tag color="orange">{todo?.priority}</Tag>
            <Tag color="green">{todo?.category?.name}</Tag>
          </Space>

          <div>
            Due Date:{" "}
            {todo?.due_date
              ? dayjs(todo.due_date).format("DD MMM YYYY")
              : "No Date"}
          </div>
        </Space>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Tasks</h2>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenCreate(true)}
        >
          Create Task
        </Button>
      </div>

      <div className="grid gap-4">
        {todo?.task.map((task) => (
          <Card
            key={task.id}
            extra={
              <Button
                icon={<EditOutlined />}
                onClick={() => handleOpenUpdate(task)}
              >
                Edit
              </Button>
            }
          >
            <Space direction="vertical" className="w-full">
              <h3 className="font-semibold">{task.title}</h3>

              <p>{task.description}</p>

              <Tag>{task.status}</Tag>

              <Space wrap>
                {task.taskImages.map((image) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    width={100}
                    height={100}
                    alt="task"
                  />
                ))}
              </Space>
            </Space>
          </Card>
        ))}
      </div>

      <Modal
        title="Create Task"
        open={openCreate}
        onOk={() => form.submit()}
        onCancel={() => setOpenCreate(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Task"
        open={openUpdate}
        onOk={() => updateForm.submit()}
        onCancel={() => setOpenUpdate(false)}
      >
        <Form form={updateForm} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
