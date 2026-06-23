"use client";
import { useTask } from "@/hooks/useTask";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import dayjs from "dayjs";
function TaskPage() {
  const params = useParams();

  const id = Number(params.id);

  const { todo, fetchTask, loading, error } = useTask();

  useEffect(() => {
    if (id) fetchTask(Number(id));
  }, []);
  return (
    <div>
      <div>{todo?.title}</div>
      <div>{todo?.status}</div>
      <div>{todo?.priority}</div>
      <div>{todo?.description}</div>
      <div>
        {todo?.due_date
          ? dayjs(todo.due_date).format("MMM D, YYYY")
          : "No Date"}
      </div>
      <div>{todo?.category.name}</div>
      <div>
        {todo?.task.map((item) => (
          <div key={item.id}>
            <div>{item.title}</div>
            <div>
              {item.taskImages.map((image) => (
                <div key={image.id}>
                  <img src={image.url} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
