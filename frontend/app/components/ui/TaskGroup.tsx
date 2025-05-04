import { title } from "process";
import { TaskItem } from "./TaskItem";
import { RawTask } from "@/app/dashboard/page";



interface TaskGroupInterface  {
    title: String
    tasks: RawTask[]
}


export const TaskGroup = ({ title, tasks }: TaskGroupInterface) => {
    return (
      <div className="mb-8">
        <h2 className="text-gray-600 mb-4">{title}</h2>
        {tasks.map((task , index) => (
          <TaskItem key={task._id} task={task} index={index + 1}/>
        ))}
      </div>
    );
  };