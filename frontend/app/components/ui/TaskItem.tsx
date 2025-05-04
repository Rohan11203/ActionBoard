export const TaskItem = ({ task } : any) => {
    return (
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className={`${task.color} w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold`}>
            {task.number}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{task.title}</h3>
            <p className="text-gray-600 text-sm">{task.description}</p>
          </div>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
          ))}
        </div>
      </div>
    );
  };