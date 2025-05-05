"use client";
import { useMemo, useState } from "react";
import { TaskGroup } from "./ui/TaskGroup";
import { RawTask } from "../dashboard/page";

interface TaskManagementProps {
  tasks: RawTask[];
}

export default function TaskManagement({ tasks }: TaskManagementProps) {
  const [activeTab, setActiveTab] = useState("Active Tasks");
  const tabs = ["Active Tasks", "Pending", "in-progress", "completed"];

  // Compute “yesterday” and “today” buckets
  const { yesterday, today } = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfToday.getDate() + 1);

    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    const y: RawTask[] = [];
    const t: RawTask[] = [];

    tasks.forEach((task) => {
      const d = new Date(task.dueDate);
      if (d >= startOfYesterday && d < startOfToday) {
        y.push(task);
      } else if (d >= startOfToday && d < startOfTomorrow) {
        t.push(task);
      }
    });

    return { yesterday: y, today: t };
  }, [tasks]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Tabs  */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="overflow-x-auto pb-2 md:pb-0">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`whitespace-nowrap pb-2 font-medium ${
                  activeTab === tab
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

       
      </div>

      {/* Render for Active Tasks */}
      {activeTab === "Active Tasks" && (
        <>
          <TaskGroup title="Yesterday" tasks={yesterday} />
          <TaskGroup title="Today" tasks={today} />
        </>
      )}

      {activeTab === "Pending" && (
        <TaskGroup
          title="Pending Tasks"
          tasks={tasks.filter((task) => task.status === "pending")}
        />
      )}

      {activeTab === "in-progress" && (
        <TaskGroup
          title="in-progress Tasks"
          tasks={tasks.filter((task) => task.status === "in-progress")}
        />
      )}

{activeTab === "completed" && (
        <TaskGroup
          title="completed Tasks"
          tasks={tasks.filter((task) => task.status === "completed")}
        />
      )}
    </div>
  );
}
