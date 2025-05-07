"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Edit2,
  Trash2,
  ChevronDown,
  UserPlus,
} from "lucide-react";
import { GetTask,UpdateTask } from "../../lib/api/page";
import TaskFormModal from "@/app/components/CreateTaskModal";
import DeleteModal from "@/app/components/ui/DeleteModal";

// Define interfaces matching API response
type User = {
  _id: string;
  username: string;
  avtar: string;
  role?: string;
};

type Assignment = {
  user: User;
  status: string;
  assignedAt: string;
};

export interface RawTask {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdBy: User;
  assignedTo: Assignment[];
  createdAt: string;
  updatedAt: string;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatDateTime = (date: string) =>
  new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusClasses: Record<string, string> = {
  "to-do": "bg-gray-100 text-gray-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};

const assignedStatusClasses: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const TaskDetailView = () => {
  const params = useParams();
  const taskId = params?.taskId;
  const router = useRouter();

  const [task, setTask] = useState<RawTask | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal,setShowModal] = useState(false);
  const [showDeleteModal,setShowDeleteModal] = useState(false);


  const fetchTask = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await GetTask(taskId);
      setTask(res.data as RawTask);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (!taskId) return;

    fetchTask();
  }, [taskId]);

  if (loading) {
    return <div className="p-8 text-center">Loading task...</div>;
  }

  if (error || !task) {
    return (
      <div className="p-8 text-center text-red-600">
        {error || "Task not found."}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}

      {
        showModal ? (
          <TaskFormModal
          title={task.title}
          description={task.description}
        onClose={() => setShowModal(false)}
        onSubmit={async (data) => {
          await UpdateTask(task._id,data)
          fetchTask();
        }}
      />
        ): null
      }

      {
        showDeleteModal ? (
          <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          taskId={task._id}
          />
        ): null
      }

      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Task Details</h1>
            </div>
            <div className="flex space-x-2">
              <button 
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
              <button 
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer">
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusClasses[task.status]
                  }`}
                >
                  {task.status
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {task.title}
              </h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">
                {task.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Due: </span>
                  <span className="font-medium">
                    {formatDate(task.dueDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} className="text-gray-400" />
                  <span>Created: </span>
                  <span className="font-medium">
                    {formatDate(task.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Created by */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Created by</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={task.createdBy.avtar}
                    alt={task.createdBy.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{task.createdBy.username}</p>
                  <p className="text-sm text-gray-500">
                    Created {formatDate(task.createdAt)}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Last updated</div>
                  <div className="text-sm font-medium">
                    {formatDate(task.updatedAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned to */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Assigned to</h3>
                
              </div>
              <div className="space-y-4">
                {task.assignedTo.map((a, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={a.user.avtar}
                          alt={a.user.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{a.user.username}</p>
                        {a.user.role && (
                          <p className="text-xs text-gray-500">{a.user.role}</p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignedStatusClasses[a.status]
                      }`}
                    >
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Activity</h3>
                <button className="text-gray-500 hover:text-gray-700">
                  <ChevronDown size={18} />
                </button>
              </div>
              <div className="space-y-4">
                {task.assignedTo[0] && (
                  <div className="relative pl-6 pb-4 border-l border-gray-200">
                    <div className="absolute -left-1.5 mt-1 w-3 h-3 bg-purple-500 rounded-full" />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">
                        {task.assignedTo[0].user.username}
                      </span>{" "}
                      accepted the task
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDateTime(task.assignedTo[0].assignedAt)}
                    </p>
                  </div>
                )}
                <div className="relative pl-6 pb-4 border-l border-gray-200">
                  <div className="absolute -left-1.5 mt-1 w-3 h-3 bg-blue-500 rounded-full" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">
                      {task.createdBy.username}
                    </span>{" "}
                    created the task
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateTime(task.createdAt)}
                  </p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 mt-1 w-3 h-3 bg-green-500 rounded-full" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">System</span> set the due date
                    to {formatDate(task.dueDate)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateTime(task.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetailView;
