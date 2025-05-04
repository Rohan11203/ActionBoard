import React, { useEffect, useState } from "react";

interface TaskFormModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function TaskFormModal({ onClose, onSubmit }: TaskFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
    assignedTo: [], 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  useEffect(() => {
    console.log("TaskFormModal mounted");
  }, []);

  
  return (
    <div className="fixed inset-0 m-2 flex items-center justify-center z-50">
      <div className="bg-slate-200 p-6 rounded-lg w-full max-w-lg shadow-lg ">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        <div className="flex flex-col gap-4 space-y-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select name="priority" value={formData.priority} onChange={handleChange} className="p-2 border rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          
          {/* Add user assignment logic later */}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
