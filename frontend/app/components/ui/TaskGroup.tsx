import { title } from "process";
import { TaskItem } from "./TaskItem";

interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high';
    status?: 'to-do' | 'in-progress' | 'completed';
  }

interface TaskGroupInterface  {
    title: String
    tasks: Task[]
}

export const TaskGroup = ({ title, tasks }: TaskGroupInterface) => {
    return (
      <div className="mb-8">
        <h2 className="text-gray-600 mb-4">{title}</h2>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    );
  };