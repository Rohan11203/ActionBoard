import { BarChart, CircleUser, Clock, FileText, ImageIcon, LayoutGrid, MessageSquare, PlusCircle, PlusCircleIcon } from "lucide-react";
const Sidebar = () => {
  return (
    <div className="w-20 bg-white border-r flex flex-col items-center py-6 space-y-8">
      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
        R
      </div>
      <nav className="flex flex-col items-center space-y-6">
        <button className="size-lg text-gray-400">
          <ImageIcon className="h-6 w-6" />
        </button>
        <button className="size-lg text-purple-700">
          <MessageSquare className="h-6 w-6" />
        </button>
        <button className="size-lg text-gray-400">
          <FileText className="h-6 w-6" />
        </button>
        <button className="size-lg text-gray-400">
          <CircleUser className="h-6 w-6" />
        </button>
        <button className="size-lg text-gray-400">
          <BarChart className="h-6 w-6" />
        </button>
        <button className="size-lg text-gray-400">
          <LayoutGrid className="h-6 w-6" />
        </button>
        <button className="size-lg text-gray-400">
          <Clock className="h-6 w-6" />
        </button>
      </nav>
      
    </div>
  );
};

export default Sidebar;
