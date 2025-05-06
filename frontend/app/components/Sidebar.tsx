"use client";
import { useState } from "react";
import {
  Search,
  BarChart,
  User,
  Menu,
  X,
  Settings,
  Home,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  username:string;
  email:string;
  activeItem: string;
  setActiveItem: (item: string) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const Sidebar:React.FC<SidebarProps> = ({ username,email
  ,activeItem, setActiveItem, open, setOpen, }) => {

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "myTasks", label: "MyTasks", icon: BarChart },
    { id: "assignedTasks", label: "Assigned Tasks", icon: User },
  ];

  return (
    <>
      <div className="md:hidden flex items-center  justify-between p-4 bg-white border-b shadow-sm">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
        <div className="text-lg font-semibold text-gray-800">Dashboard</div>
        <div className="w-6" />
      </div>

      {open && (
        <div
          className="fixed inset-0   z-40  transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-auto  bg-white border-r border-gray-200 shadow-lg z-50 transform 
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static transition-transform duration-300 ease-in-out
        w-72 md:w-64 lg:w-72 flex flex-col`}
      >
        <div className="p-4 border-b  border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {
                  username.charAt(0).toUpperCase()
                }
              </div>
              <span className="text-xl font-semibold text-gray-800">
                {username}
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <p className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Main Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                  activeItem === item.id
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                <Icon
                  className={`h-5 w-5 ${
                    activeItem === item.id ? "text-purple-700" : "text-gray-500"
                  }`}
                />
                <span className="ml-3">{item.label}</span>
                {activeItem === item.id && (
                  <div className="ml-auto w-1.5 h-5 bg-purple-700 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{username}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

    </>
  );
};

export default Sidebar;
