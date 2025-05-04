export const TaskItem = ({ task,index }: any) => {
  
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className={`bg-blue-400 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold`}
        >
          {index}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{task.title}</h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
        </div>
      </div>
      {/* Assigned users' avatars */}
      <div className="flex -space-x-2">
        {task.assignedTo?.map((assignee: any, index: number) => (
          <div key={index} className="relative group">
            <img
              src={assignee.user.avtar}
              alt={assignee.user.username}
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {assignee.user.username}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
