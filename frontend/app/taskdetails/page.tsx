import React from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Edit2, 
  Trash2,
  ChevronDown,
  UserPlus
} from 'lucide-react';

// Sample data based on the mongoose schema
const task = {
  _id: "t123456789",
  title: "Redesign Marketing Dashboard",
  description: "Create a new user interface for the marketing analytics dashboard. Focus on improving data visualization and user experience. Include components for campaign performance, audience demographics, and conversion metrics.",
  status: "in-progress",
  priority: "high",
  dueDate: new Date("2025-05-15"),
  createdBy: {
    _id: "u100",
    name: "Alex Morgan",
    avatar: "/api/placeholder/40/40"
  },
  assignedTo: [
    {
      user: {
        _id: "u101",
        name: "Jamie Chen",
        avatar: "/api/placeholder/40/40",
        role: "UI Designer"
      },
      status: "accepted",
      assignedAt: new Date("2025-05-01")
    },
    {
      user: {
        _id: "u102",
        name: "Taylor Kim",
        avatar: "/api/placeholder/40/40",
        role: "Frontend Developer"
      },
      status: "accepted",
      assignedAt: new Date("2025-05-01")
    },
    {
      user: {
        _id: "u103",
        name: "Jordan Smith",
        avatar: "/api/placeholder/40/40",
        role: "Product Manager"
      },
      status: "pending",
      assignedAt: new Date("2025-05-02")
    }
  ],
  createdAt: new Date("2025-05-01"),
  updatedAt: new Date("2025-05-03")
};

// Helper functions
const formatDate = (date:any) => {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

const formatDateTime = (date:any) => {
  return new Date(date).toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};

const priorityClasses = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const statusClasses = {
  'to-do': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  'completed': 'bg-green-100 text-green-800'
};

const assignedStatusClasses = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const TaskDetailView = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button className="mr-4 p-2 rounded-full hover:bg-gray-100">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Task Details</h1>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
              <button className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-2">
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
          {/* Task information (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            {/* Task header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses["in-progress"]}`}>
                  {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                {/* <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityClasses[task.priority]}`}> */}
                  {/* {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority */}
                {/* </span> */}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{task.title}</h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">{task.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Due: </span>
                  <span className="font-medium">{formatDate(task.dueDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} className="text-gray-400" />
                  <span>Created: </span>
                  <span className="font-medium">{formatDate(task.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar (1/3 width on large screens) */}
          <div className="space-y-6">
            {/* Created by */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Created by</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img src={task.createdBy.avatar} alt={task.createdBy.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">{task.createdBy.name}</p>
                  <p className="text-sm text-gray-500">Created {formatDate(task.createdAt)}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Last updated</div>
                  <div className="text-sm font-medium">{formatDate(task.updatedAt)}</div>
                </div>
              </div>
            </div>
            
            {/* Assigned to */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Assigned to</h3>
                <button className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm font-medium">
                  <UserPlus size={16} />
                  <span>Assign</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {task.assignedTo.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={assignment.user.avatar} alt={assignment.user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{assignment.user.name}</p>
                        <p className="text-xs text-gray-500">{assignment.user.role}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${assignedStatusClasses["accepted"]}`}>
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Timeline / Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Activity</h3>
                <button className="text-gray-500 hover:text-gray-700">
                  <ChevronDown size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="relative pl-6 pb-4 border-l border-gray-200">
                  <div className="absolute -left-1.5 mt-1 w-3 h-3 bg-purple-500 rounded-full"></div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Jamie Chen</span> accepted the task
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{formatDateTime(task.assignedTo[0].assignedAt)}</p>
                </div>
                
                <div className="relative pl-6 pb-4 border-l border-gray-200">
                  <div className="absolute -left-1.5 mt-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Alex Morgan</span> created the task
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{formatDateTime(task.createdAt)}</p>
                </div>
                
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 mt-1 w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">System</span> set the due date to {formatDate(task.dueDate)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{formatDateTime(task.createdAt)}</p>
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