import { Router } from "express";
import { assignTask, createTask, deleteTask, getTask, listAssignedTasks, listCreatedTasks, listOverdueTasks, listTasks, updateTask } from "../controllers/taskController";

export const TaskRouter = Router();

TaskRouter.post("/", createTask);
TaskRouter.get("/", listTasks);
TaskRouter.get("/:taskId", getTask);
TaskRouter.put("/:taskId",updateTask);
TaskRouter.delete("/taskId", deleteTask);
TaskRouter.post("/:taskId/assign", assignTask)

// DasHbord
TaskRouter.get("/dashboard/assigned", listAssignedTasks);
TaskRouter.get("/dashboard/created", listCreatedTasks)
TaskRouter.get("/dashboard/overdue", listOverdueTasks)

