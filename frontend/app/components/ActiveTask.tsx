"use client"
import { Search } from "lucide-react";
import { useState } from "react";
import { TaskGroup } from "./ui/TaskGroup";

const TaskManagement = () => {

    const taskData = {
        yesterday: [
          {
            id: 1,
            number: 1,
            title: 'Task One',
            description: 'Create App Design For Marketing Company',
            color: 'bg-purple-500'
          },
          {
            id: 2,
            number: 2,
            title: 'Task Two',
            description: 'Marketing Ads Review For Education Platform',
            color: 'bg-pink-500'
          },
          {
            id: 3,
            number: 3,
            title: 'Task Three',
            description: 'Salary Payment For Our Remote Employee',
            color: 'bg-emerald-500'
          }
        ],
        today: [
          {
            id: 4,
            number: 4,
            title: 'Task Four',
            description: 'Create App Design For Marketing Company',
            color: 'bg-purple-500'
          },
          {
            id: 5,
            number: 5,
            title: 'Task Five',
            description: 'Marketing Ads Review For Architect Platform',
            color: 'bg-pink-500'
          }
        ]
      };

      
      
    // State for active tab
    const [activeTab, setActiveTab] = useState('Active Tasks');
    
    // Available tabs
    const tabs = ['Active Tasks', 'Pending', 'Reviewed', 'Completed', 'Archived'];
    
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="overflow-x-auto pb-2 md:pb-0">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`whitespace-nowrap pb-2 font-medium ${
                    activeTab === tab 
                      ? 'text-purple-600 border-b-2 border-purple-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>
        
        {/* Only render task content for Active Tasks tab as an example */}
        {activeTab === 'Active Tasks' && (
          <>
            <TaskGroup title="Yesterday" tasks={taskData.yesterday} />
            <TaskGroup title="Today" tasks={taskData.today} />
          </>
        )}
        
        {/* Message for other tabs */}
        {activeTab !== 'Active Tasks' && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">This is the {activeTab} tab content area.</p>
            <p className="text-gray-500 text-sm mt-2">
              Add your {activeTab.toLowerCase()} tasks content here.
            </p>
          </div>
        )}
      </div>
    );
  };
  
  export default TaskManagement;