"use client";
import { Plus, PlusCircle, PlusIcon } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Card from "../components/ui/Card";
import TaskManagement from "../components/ActiveTask";
import { Schedule } from "@mui/icons-material";
import { ListAllTasks } from "../lib/api/page";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);

  async function FetchTasks(){
    await ListAllTasks()
  }

  useEffect(()=>{
    FetchTasks();
  },[])
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="flex min-h-screen ">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex  gap-4  bg-slate-100 w-full m-4 p-4 rounded-lg">
          <div className="flex-2">
            <div className="flex justify-between">
              <div className="p-4 bg-gray-100 max-w-xs">
                <Card
                  title="Project Alpha"
                  description="This is a detailed description of the project which might span multiple lines in some cases."
                  avatarUrls={[
                    "https://i.pravatar.cc/150?img=1",
                    "https://i.pravatar.cc/150?img=2",
                    "https://i.pravatar.cc/150?img=3",
                  ]}
                  backgroundColor="bg-blue-50"
                  onMenuClick={() => alert("Menu clicked")}
                />
              </div>
              <div className="p-4 bg-gray-100 max-w-xs">
                <Card
                  title="Project Alpha"
                  description="This is a detailed description of the project which might span multiple lines in some cases."
                  avatarUrls={[
                    "https://i.pravatar.cc/150?img=1",
                    "https://i.pravatar.cc/150?img=2",
                    "https://i.pravatar.cc/150?img=3",
                  ]}
                  backgroundColor="bg-blue-50"
                  onMenuClick={() => alert("Menu clicked")}
                />
              </div>
              <div className="p-4 bg-gray-100 max-w-xs">
                <Card
                  title="Project Alpha"
                  description="This is a detailed description of the project which might span multiple lines in some cases."
                  avatarUrls={[
                    "https://i.pravatar.cc/150?img=1",
                    "https://i.pravatar.cc/150?img=2",
                    "https://i.pravatar.cc/150?img=3",
                  ]}
                  backgroundColor="bg-blue-50"
                  onMenuClick={() => alert("Menu clicked")}
                />
              </div>
            </div>

            <div className="flex justify-between items-center py-4 px-4">
              <h1 className="text-2xl font-bold text-gray-800">Recent Tasks</h1>
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                onClick={() => console.log("Create new task")}
              >
                <Plus size={18} />
                <span>New</span>
              </button>
            </div>

            <TaskManagement />
          </div>

          <div className="flex-1 p-4 border border-slate-200  shadow-lg rounded-xl">
            <div className="flex gap-2">
                <div className="bg-blue-500 text-white p-1 rounded-lg text-center"><Schedule /></div>
              <h1 className="font-semibold text-lg">UpComing Shedule</h1>
            </div>
            <div className="p-4">
              <Card
                title="Project Alpha"
                description="This is a detailed description of the project which might span multiple lines in some cases."
                avatarUrls={[
                  "https://i.pravatar.cc/150?img=1",
                  "https://i.pravatar.cc/150?img=2",
                  "https://i.pravatar.cc/150?img=3",
                ]}
                backgroundColor="bg-blue-50"
                onMenuClick={() => alert("Menu clicked")}
              />
            </div>

            <div className="p-4">
              <Card
                title="Project Alpha"
                description="This is a detailed description of the project which might span multiple lines in some cases."
                avatarUrls={[
                  "https://i.pravatar.cc/150?img=1",
                  "https://i.pravatar.cc/150?img=2",
                  "https://i.pravatar.cc/150?img=3",
                ]}
                backgroundColor="bg-blue-50"
                onMenuClick={() => alert("Menu clicked")}
              />
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
