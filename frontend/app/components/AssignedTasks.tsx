"use client";
import { useEffect, useState } from "react";
import {  listAssignedTasks } from "../lib/api/page";
import { RawTask } from "../dashboard/page";
import Card from "./ui/Card";

const AssignedTasks = () => {
  const [tasks, setTasks] = useState<RawTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const response = await listAssignedTasks()
        setTasks(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, []);

  if (loading) return <p className="p-4">Loading tasks...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks Assigned</h1>
      {tasks.length === 0 ? (
        <p>No tasks Assigned yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <Card task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignedTasks;
