import { useRouter } from "next/navigation";
import React from "react";

export default function Card({
  task,
}:any) {

  const router = useRouter();

  function handleClick(){
    router.push(`/taskdetails/${task._id}`)
  }

  return (
    <div
    onClick={handleClick}
    className={`bg-blue-100 rounded-xl cursor-pointer shadow-md p-4 flex flex-col gap-3 m-4`}>
      <h2 className="font-semibold truncate">{task.title}</h2>
      <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>

      <div className="flex items-center">
        <div className="flex -space-x-2">
          {task.assignedTo?.map((assignee:any, idx:number) => (
            <div key={idx} className="relative group">
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                <img
                  src={assignee.user.avtar}
                  alt={`Avatar ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {assignee.user.username}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
