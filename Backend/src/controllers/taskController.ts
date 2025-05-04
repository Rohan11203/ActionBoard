import { Request, Response, NextFunction, RequestHandler } from "express";
import { Types } from "mongoose";
import { TaskModel } from "../db/db"; // adjust path as needed
import { UserModel } from "../db/db";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user: JwtPayload & { sub: string; email: string };
}

// Create a new task
export const createTask: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const createdBy = (req.user as any).sub;

    const task = await TaskModel.create({
      title,
      description,
      dueDate,
      priority,
      status,
      createdBy,
      assignedTo: [],
    });

    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// List all tasks with search & filter
export const listTasks: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const { search, status, priority, dueDateBefore, dueDateAfter } = req.query;
    const filter: any = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (dueDateBefore || dueDateAfter) filter.dueDate = {};
    if (dueDateBefore) filter.dueDate.$lte = new Date(dueDateBefore as string);
    if (dueDateAfter) filter.dueDate.$gte = new Date(dueDateAfter as string);

    const tasks = await TaskModel.find(filter).sort({ dueDate: 1 }).populate("assignedTo.user", "avtar username").lean();
    return res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Get a single task
export const getTask = async (req: any, res: any, next: any) => {
  try {
    const { taskId } = req.params;
    if (!Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await TaskModel.findById(taskId).lean();
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// Update a task
export const updateTask = async (req: any, res: any, next: any) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const task = await TaskModel.findByIdAndUpdate(taskId, updates, {
      new: true,
    }).lean();
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// Delete a task
export const deleteTask = async (req: any, res: any, next: any) => {
  try {
    const { taskId } = req.params;
    const task = await TaskModel.findByIdAndDelete(taskId).lean();
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};

// Assign task to users and notify
export const assignTask = async (req: any, res: any, next: any) => {
  try {
    const { taskId } = req.params;
    const { assigneeIds } = req.body as { assigneeIds: string[] };

    console.log(taskId);
    console.log(assigneeIds);
    // Validate task
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update assignedTo
    task.assignedTo.splice(0, task.assignedTo.length);

    // push new ones
    assigneeIds.forEach((id) =>
      task.assignedTo.push({
        user: new Types.ObjectId(id),
        status: "pending",
        assignedAt: new Date(),
      })
    );

    await task.save();
    // Create notifications for each assignee
    await Promise.all(
      assigneeIds.map(async (id) => {
        await UserModel.findByIdAndUpdate(id, {
          $push: {
            assignedTasks: task._id,
            notifications: {
              taskId: task._id,
              message: `A new task "${task.title}" has been assigned to you.`,
              status: "unread",
              createdAt: new Date(),
            },
          },
        });
      })
    );

    return res.status(200).json({ message: "Task assigned" });
  } catch (err) {
    next(err);
  }
};

// Dashboard: tasks assigned to the current user
export const listAssignedTasks = async (req: any, res: any, next: any) => {
  try {
    const userId = new Types.ObjectId((req.user as any).sub);
    const user = await UserModel.findById(userId)
      .populate("assignedTasks") // this populates with full task documents
      .lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.assignedTasks);
  } catch (err) {
    next(err);
  }
};

// Dashboard: tasks created by the current user
export const listCreatedTasks = async (req: any, res: any, next: any) => {
  try {
    const userId = (req.user as any).sub;
    const tasks = await TaskModel.find({ createdBy: userId }).lean();
    return res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Dashboard: overdue tasks for current user
export const listOverdueTasks = async (req: any, res: any, next: any) => {
  try {
    const userId = new Types.ObjectId((req.user as any).sub);
    console.log(userId)
    const now = new Date();
    const tasks = await TaskModel.find({
      "assignedTo.user": userId,
      dueDate: { $lt: now },
      status: { $ne: "done" },
    }).lean();
    return res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};
