import React, { useEffect, useState } from "react";
import { X, Calendar, CheckCircle, Flag, AlignLeft, Users } from "lucide-react";
import AssignUser from "./AssignUser";

interface TaskFormModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isEdit?: boolean;
  initialData?: any;
  title?:string;
  description?:string;
}

export default function TaskFormModal({
  title,
  description,
  onClose,
  onSubmit,
  isEdit = false,
  initialData,
}: TaskFormModalProps) {
  const [selectedUserId, setSelectedUserId] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
    assignedTo: [] as string[],
    ...initialData,
  });

  useEffect(() => {
    setFormData((prev:any) => ({
      ...prev,
      assignedTo: selectedUserId,
      title: title || prev.title,
    description: description || prev.description,
    }));
  }, [title,description,selectedUserId]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };

  const statusColors = {
    pending: "bg-gray-100 text-gray-800 border-gray-200",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-purple-100 text-purple-800 border-purple-200",
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50 backdrop-blur-sm p-2 sm:p-4">
      <div
        className="bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto max-w-sm sm:max-w-md md:max-w-lg shadow-xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {isEdit ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Task title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 sm:pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                required
              />
              <div className="absolute  left-3 top-3.5 text-gray-400">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                placeholder="Task details..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 sm:pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 min-h-20 sm:min-h-24"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                <AlignLeft className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full p-2 sm:p-3 sm:pl-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 pr-10 ${
                    statusColors[formData.status as keyof typeof statusColors]
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="absolute left-3 top-3.5 text-gray-600">
                  <CheckCircle className=" h-5 w-5" />
                </div>
                <div className="absolute right-3 top-3.5 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <div className="relative">
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 pr-10 ${
                    priorityColors[
                      formData.priority as keyof typeof priorityColors
                    ]
                  }`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="absolute left-3 top-3.5 text-gray-600">
                  <Flag className="h-5 w-5" />
                </div>
                <div className="absolute right-3 top-3.5 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <div className="relative">
              <input
                id="dueDate"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Assigned To -  implementation Remaining */}
          {/* <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Assigned To
            </label>
            <div className="relative">
              <div className="w-full p-2 sm:p-3 sm:pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 pl-10">
                User assignment will be implemented later
              </div>
              <div className="absolute left-3 top-3.5 text-gray-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div> */}

          <AssignUser selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 bg-gray-50 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 order-1 sm:order-2"
          >
            {isEdit ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
