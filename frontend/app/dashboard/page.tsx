"use client";
import { Plus } from "lucide-react";
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
  const [showModal, setShowModal] = useState(false);

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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <Sidebar />

      <main className="flex-1 flex flex-col p-4 md:p-6">
        <section className="mb-6">
          <h2 className="sr-only">Highlighted Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.slice(0, 3).map((task) => (
              <Card key={task._id} task={task} />
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Recent Tasks</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            New
          </button>
        </div>

        {showModal && (
          <TaskFormModal
            onClose={() => setShowModal(false)}
            onSubmit={async (data) => {
              await CreateTask(data);
              fetchTasks();
            }}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Task Management (left) */}
          <section className="flex-1">
            <TaskManagement tasks={tasks} />
          </section>

          {/* High Priority Panel (right) */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 text-white p-2 rounded-md mr-2">
                  <Schedule />
                </div>
                <h2 className="text-lg font-semibold">High Priority Tasks</h2>
              </div>
              <div className="space-y-3">
                {tasks
                  .filter((t) => t.priority === "high")
                  .map((t) => (
                    <Card key={t._id} task={t} />
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}