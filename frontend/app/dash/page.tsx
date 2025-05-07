"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../dashboard/page";
import SearchPage from "../search/page";
import { GetProfile } from "@/lib/auth";
import MyTasksPage from "../components/MyTasks";
import AssignedTasks from "../components/AssignedTasks";
export interface Notification {
  taskId: string;
  message: string;
  status: "read" | "unread";
  createdAt: string; // ISO date string
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password?: string; // optional, usually not returned from backend
  createdAt: string;
  avtar?: string;
  notifications: Notification[];
  assignedTasks: string[];
}


const page = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<User[]>([]);

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("");

  async function fetchUserData() {
    const res = await GetProfile();
    const userData = res.data
    setUserData(userData);
    setUsername(userData.username)
    setEmail(userData.email)
  }

  useEffect(()=>{
    fetchUserData();
  },[])
  const renderContent = () => {
    switch (activeItem) {
      case "home":
        return <Dashboard />;
      case "search":
        return <SearchPage />;
        case "myTasks":
          return <MyTasksPage />;
        case "assignedTasks":
          return <AssignedTasks />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar
      username={username}
      email={email}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <main className="ml-0 w-full min-h-screen bg-gray-50">
        {renderContent()}
      </main>
    </div>
  );
};

export default page;
