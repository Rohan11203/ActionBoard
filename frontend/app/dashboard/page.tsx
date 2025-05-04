"use client";
import { Plus, PlusCircle, PlusIcon } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Card from "../components/ui/Card";
import TaskManagement from "../components/ActiveTask";
import { Schedule } from "@mui/icons-material";
import { CreateTask, ListAllTasks } from "../lib/api/page";
import { useEffect, useState } from "react";
import TaskFormModal from "../components/CreateTaskModal";

export interface RawTask {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdBy: string;
  assignedTo: any[];
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<RawTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setshowModal] = useState(false);

  async function fetchTasks() {
    setLoading(true);
    setError(null);

    try {
      const res = await ListAllTasks();
      setTasks(res.data as RawTask[]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading tasks…</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="flex min-h-screen ">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex  gap-4  bg-slate-100 w-full m-4 p-4 rounded-lg">
          <div className="flex-2">
            <div className="flex justify-between">
              {tasks.slice(0, 3).map((task) => (
                <div key={task._id} className="p-4 bg-gray-100 max-w-xs">
                  <Card task={task} />
                </div>
              ))}
            </div>

            <div className="flex relative justify-between items-center py-4 px-4">
              {showModal && (
                <TaskFormModal
                  onClose={() => setshowModal(false)}
                  onSubmit={async(data) => {
                    console.log("Task submitted", data);
                    await CreateTask(data)
                  }}
                />
              )}
              <h1 className="text-2xl font-bold text-gray-800">Recent Tasks</h1>
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                onClick={() => setshowModal(true)}
              >
                <Plus size={18} />
                <span>New</span>
              </button>
            </div>

            <TaskManagement tasks={tasks} />
          </div>

          <div className="flex-1 p-4 border border-slate-200  shadow-lg rounded-xl">
            <div className="flex gap-2">
              <div className="bg-red-500 text-white p-1 rounded-lg text-center">
                <Schedule />
              </div>
              <h1 className="font-semibold text-lg">High Priority Tasks</h1>
            </div>
            <div className="p-4">
              {tasks
                .filter((task) => task.priority === "high")
                .map((task) => (
                  <Card key={task._id} task={task} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
