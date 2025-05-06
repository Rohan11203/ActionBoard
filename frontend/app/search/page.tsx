"use client";

import React, { useEffect, useState } from "react";
import { ListAllTasks, TaskFilters } from "@/app/lib/api/page";
import { TaskItem } from "@/app/components/ui/TaskItem";
import { Search, Calendar, Filter, Loader } from "lucide-react";
import Sidebar from "../components/Sidebar";

export interface RawTask {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdBy: any;
  assignedTo: any[];
  createdAt: string;
  updatedAt: string;
}

export default function SearchPage() {
  const [filters, setFilters] = useState<TaskFilters>({});
  const [tasks, setTasks] = useState<RawTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await ListAllTasks(filters);
        setTasks(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [filters]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((f) => ({ ...f, search: e.target.value || undefined }));
  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters((f) => ({ ...f, status: e.target.value || undefined }));
  const onPriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters((f) => ({ ...f, priority: e.target.value || undefined }));
  const onDueBeforeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((f) => ({ ...f, dueDateBefore: e.target.value || undefined }));
  const onDueAfterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((f) => ({ ...f, dueDateAfter: e.target.value || undefined }));

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  return (
    <main className="flex flex-col lg:flex-row max-w-screen-xl mx-auto p-4 gap-4">

      {/* <aside className="w-64 lg:w-70">
        <Sidebar />
      </aside> */}

      {/* Main Content */}
      <section className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Search Tasks</h1>
            <button
              onClick={toggleFilter}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition duration-200"
            >
              <Filter size={18} />
              <span>{isFilterExpanded ? "Hide Filters" : "Show Filters"}</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              onChange={onSearchChange}
              className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {isFilterExpanded && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  onChange={onStatusChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  <option value="to-do">To-Do</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  onChange={onPriorityChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="space-y-2 col-span-1 sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      onChange={onDueAfterChange}
                      placeholder="From"
                      className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      onChange={onDueBeforeChange}
                      placeholder="To"
                      className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6">
          {loading && (
            <div className="flex items-center justify-center py-10">
              <Loader size={24} className="text-blue-500 animate-spin mr-2" />
              <span className="text-gray-600">Loading tasks...</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-center">
              <span className="font-medium">Error:</span>
              <span className="ml-2">{error}</span>
            </div>
          )}

          {!loading && !error && tasks.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No tasks match your filters. Try adjusting your search criteria.
            </div>
          )}

          <div className="space-y-3">
            {tasks.map((t, i) => (
              <TaskItem key={t._id} task={t} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
